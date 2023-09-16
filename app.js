const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Route Imports
const projectRoutes = require("./routes/projectRoutes.js");

//Connecting to DB import function
const { connectToDB } = require("./db/dbConfig.js")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Interfacing Routes and APIs
app.use("/api", projectRoutes);

// Middleware for Errors
app.use(errorMiddleware);

const port = 8000;

//Initializing Server
const server = app.listen(port, (req, res) => {
  console.log(`Server is working on http://localhost:${port}`);
});

//Connecting to DB
connectToDB();

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => { 
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
