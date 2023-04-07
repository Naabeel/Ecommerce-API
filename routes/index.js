const { Router } = require('express');
const express = require('express');

const route = express.Router();
const productController = require('../controllers/product');


route.get('/', productController.home );
route.post('/addproduct', productController.addproduct);
route.post('/update/:id', productController.updating);

route.get('/delete/:id', productController.delete)






// URL  for api testing
route.post('/products/create', productController.addProducttodb);
route.get('/products', productController.findallproduct);
route.delete('/products/:id', productController.deleteProduct);
route.post('/products/:id/update_quantity/', productController.updation);

module.exports = route;