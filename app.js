const express = require("express");
const axios = require('axios');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Route Imports
const projectRoutes = require("./routes/projectRoutes.js");

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

//Ingesting a schema from a sample_db file -- POST -> /:collection
const endpointUrl = 'http://localhost:8000/api/startuptest'

async function ingestSchemaOnServerStartup() {
  try {
    const response = await axios.post(endpointUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Ingested Schema from JSON successfully');
    } else {
      console.error('JSON Schema Ingestion failed:', response.status);
    }
  } catch (error) {
    console.error('Error making ingestion request :', error.message);
  }
}

ingestSchemaOnServerStartup();

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => { 
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
