const express = require('express')
const productRouter = express.Router()
const Controller = require('./productController')

productRouter.get('/products', Controller.getAllProducts)
productRouter.get(`/products/product/:id`, Controller.getProductDetail)

productRouter.post(`/products`, Controller.addProduct)
productRouter.delete('/products/product/:id', Controller.deleteProduct)



module.exports = productRouter;