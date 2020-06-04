const app = require("express")()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const env = require("dotenv")
const fileUpload = require("express-fileupload")
const socket = require('./helper/socket.io')

const adminRoutes = require("./routes/adminRoutes")
const googleApiRoutes = require("./routes/googleApiRoutes")
const profileRoutes = require("./routes/profileRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const searchRoutes = require("./routes/searchRoutes")
const showRoutes = require("./routes/showRoutes")

env.config()
app.use(fileUpload({
  createParentPath: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status).json(error.messages)
})

mongoose.connect("mongodb://localhost:27017/showhook")
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