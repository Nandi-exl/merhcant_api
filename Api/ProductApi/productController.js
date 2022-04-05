const Product = require('./modelProduct');

class Controller{
static async getAllProducts(req, res){
    try {
        const data = await Product.getAllproducts()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message : "product undefined"})
    }
}

static async getProductDetail(req, res) {
    const id = req.params.id
    const data = req.body
    try {
        const data = await Product.getProductDetail(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({message : "no product"})
    }
}

static async addProduct(req, res){
    const data = req.body
    const existProduct = await Product.getProductDetail(data.id)
        if(existProduct[0]){
            return res.status(400).json({message : "product exist"})
        }
    await Product.addProduct(data)
    res.status(201).json(data) 
}

}

module.exports = Controller;