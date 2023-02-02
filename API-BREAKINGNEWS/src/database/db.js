import mongoose from "mongoose";
const connection = () => {
  console.log("Connecting to database...")


  mongoose.connect( process.env.MONGOBD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    console.log("Connected to database")
  )
    .catch((err) => {
      console.log("Error connecting to database")
      console.log(err)
    })
}



export default connection;