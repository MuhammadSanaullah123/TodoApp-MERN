const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "test") {
  // Connect to the real MongoDB only if not running tests
  connectDB();
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/tasks", require("./routes/api/tasks"));

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
