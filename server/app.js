require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
// const connectToDB = require("./config/dbConn.js");
const connectToDB = require("./config/dbConn");
// const path = require("path");

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// database connection
connectToDB();

// routers for routing APIs

const registerRouter = require("./routes/registerRoutes");
const loginRouter = require("./routes/loginRoutes");
const adminRouter = require("./routes/adminRoutes");
const facultyRouter = require("./routes/facultyRoutes");
const studentRouter = require("./routes/studentRoutes");

// Configuration middlewares

app.use(
  cors({
    origin: ["https://student-result-analyser-frontend.onrender.com"],
    methods: ["POST", "GET", "PUT", "DELETE"], // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// API Routes

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/student", studentRouter);

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "client", "build")));
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
