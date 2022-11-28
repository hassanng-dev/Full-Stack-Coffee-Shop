const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

//stay logged in & close browser come back and still be logged in 
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//flexibility to use a fetch api 
const methodOverride = require("method-override");

//alerts (inncorrect passwords, etc)
const flash = require("express-flash");
const logger = require("morgan");

//connecting all files
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment")

//Use .env file in config folder (not built into node)
//without this line the env folder will not work
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing (to look at data in the forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB (adds a cookie to client side to identify who they are)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
