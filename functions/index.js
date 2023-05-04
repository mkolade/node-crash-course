

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const blogRoutes = require("../Routes/blogRoutes");

// Mongodb connection
const dbUrl = "mongodb+srv://moshoodmohammed:managermuhkid@cluster1.e4kvies.mongodb.net/node-tuit?retryWrites=true&w=majority";
mongoose.connect(dbUrl)
    .then((result) => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use("/blogs", blogRoutes);

app.get("/", (req, res) =>{
  res.redirect("/blogs");
});

app.get("/about", (req, res) =>{
  res.render("about", {title: "About"});
});

app.use((req, res) =>{
  res.status(404).render("404", {title: "404"});
});

exports.app = functions.https.onRequest(app);
