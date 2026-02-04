const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/student", require("./routes/student.routes"));
app.use("/api/institute", require("./routes/institute.routes"));
app.use("/api/verify", require("./routes/verify.routes"));

module.exports = app;
