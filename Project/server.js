const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ingestRoute = require("./routes/ingest");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/intrusionDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// mount routes
app.use("/api", ingestRoute);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
