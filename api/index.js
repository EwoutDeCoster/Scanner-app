
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/link");
const cors = require("cors");
const https=require('https')
const fs = require('fs');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "online" });
});

  app.get("/producten", async (req, res) => {
  const producten = await db.getAll();
  res.status(200).json({ producten });
});

  app.get("/product/:btwnum", async (req, res) => {
  const product = await db.getProduct(req.params.btwnum, req.body);
  res.status(200).json({ product });
});



let port = 4444;

/*https.createServer(options,app)*/app.listen(port, () => console.log(`server is running on port ${port}`));
