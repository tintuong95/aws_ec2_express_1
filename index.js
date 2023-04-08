const express = require("express");
const cors = require("cors");

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "test",
  "debian-sys-maint",
  "JeAseyn7EWEvMyjD",
  {
    host: "localhost",
    dialect: "mysql",
  }
);


const Hello = sequelize.define("hello", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

const app = express();
const port = 3000;

sequelize.sync({ force: true });

app.use(cors());

app.get("/", async (req, res) => {
  const hello = await Hello.findAll();
  console.log(JSON.stringify(hello));
  res.send(JSON.stringify(hello));
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
