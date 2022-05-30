

const express = require('express');
const router = express.Router();
const productsControl = require("../controllers/products-controller");


router.route("/").get(productsControl.getAllProducts);
router.route("/static").get(productsControl.getAllProductsStatic);







module.exports = router;