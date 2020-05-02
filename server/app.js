const app = require("express")()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const env = require("dotenv")
const fileUpload = require("express-fileupload")
const socket = require('./helper/socket.io')

const adminRoutes = require("./routes/adminRoutes")
const googleApiRoutes = require("./routes/googleApiRoutes")
const profileRoutes = require("./routes/profileRoutes")
const offerRoutes = require("./routes/offerRoutes")
const searchRoutes = require("./routes/searchRoutes")

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
app.use(offerRoutes)
app.use("/search", searchRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status).json(error.messages)
})

mongoose.connect("mongodb://localhost:27017/showhook")
.then(result => {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000")  
  })

  socket.init(server)
  socket.io().on('connection', socket => {
    socket.emit('testClient', {msg: 'Connected to main namespace'})
    socket.on('testServer', msg => console.log(msg))
  })
})
.catch(err => console.log(err))