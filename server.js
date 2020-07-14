const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const env = require("dotenv")
const socket = require('./server/helper/socket.io')

if (process.env.USERNAME === 'daniel') {
  const result = env.config({path: __dirname + '/.env'})
  if (result.error) {
    throw result.error
  }
}

const adminRoutes = require("./server/routes/adminRoutes")
const googleApiRoutes = require("./server/routes/googleApiRoutes")
const profileRoutes = require("./server/routes/profileRoutes")
const bookingRoutes = require("./server/routes/bookingRoutes")
const searchRoutes = require("./server/routes/searchRoutes")
const showRoutes = require("./server/routes/showRoutes")
const paymentRoutes = require("./server/routes/paymentRoutes")

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminRoutes)
app.use("/google-api", googleApiRoutes)
app.use(profileRoutes)
app.use('/booking', bookingRoutes)
app.use("/search", searchRoutes)
app.use("/show", showRoutes)
app.use("/payment", paymentRoutes)

//Server static assets
app.use(express.static('dist'))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}) 

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.status || 500
  res.status(status).json({error: error.messageArray})
})

/*Connect to a cloud database or local database
depending on if the app is in a development or production
environment*/
let databaseConnect = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'development') {
  databaseConnect = process.env.DATABASE_URL
}

mongoose.connect(databaseConnect)
.then(result => {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000")  
  })

  const namespaceState = []

  socket.init(server)
  socket.io().on('connection', dSocket => {
    dSocket.emit('testClient', {msg: 'Client connected to main namespace'})
    dSocket.on('testServer', data => console.log(data.msg))
    
    dSocket.on('sendNameSpaces', namespaces => {
      namespaces.forEach(ns => {
        let checkNamespaceExists = null
        
        if (namespaceState.length > 0) {
          checkNamespaceExists = namespaceState.includes(ns)
        }

        if (!checkNamespaceExists) {
          socket.io().of('/' + ns).on('connection', nsSocket => {
            console.log(`namespace ${ns} connected`)
            namespaceState.push(ns)

            nsSocket.on('joinRoom', data => {
              nsSocket.join(data.roomId, () => {
                console.log('joined room', data.roomId)
              })
            })

            nsSocket.on('leaveRoom', data => {
              nsSocket.leave(data.roomId, () => {
                console.log('left room', data.roomId)
              })
            })
          })
        }
      })
    })
  })
})
.catch(err => console.log(err))