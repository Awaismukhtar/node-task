const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");
const companyRoutes = require("./routes/company");
const userRoutes = require("./routes/user");
require("dotenv").config();
const fs = require("fs");

if (!fs.existsSync(process.env.UPLOAD_DIR)) {
  fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true });
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", companyRoutes);
app.use("/api", userRoutes);

sequelize.sync({ alter: false }).then(() => {
  console.log("Database synchronized");
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
