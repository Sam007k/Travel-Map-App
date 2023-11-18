const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000","https://travel-map-app-z1x1.onrender.com/"],
    methods: ["POST", "PUT", "PATCH", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGODB_Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
