//https://fakestoreapi.com/
const express = require("express");
const fetch = require("node-fetch");
const querystring = require("querystring");
const bodyParser = require("body-parser");
const url = require("url");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.get("/products/:id", (req, res) => {
  fetchProducts(req.params.id).then((data) => {
    res.send(data);
  });
});

app.get("/products", (req, res) => {
  fetchProducts().then((data) => {
    res.send(data);
  });
});

/**
 *   {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description: '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    rating: { rate: 4.7, count: 130 }
  }
 */

async function fetchProducts(id = -1) {
  let url = "https://fakestoreapi.com/products";
  if (id > -1) {
    url += `/${id}`;
  }
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

app.listen(port, () => console.log(`Application listening at port ${port} --`));
