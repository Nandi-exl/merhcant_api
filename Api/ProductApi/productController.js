const Product = require('./modelProduct');
const { isAuth } = require('../../auth/isAuth')

class Controller{
static async getAllProducts(req, res){
    try {
        const userId = isAuth(req)
        if(userId !== null){
            const data = await Product.getAllproducts()
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).json(`${error.message}`)
    }
}

static async getProductDetail(req, res) {
    try {
        const userId = isAuth(req)
        if(userId !== null){
            const id = req.params.id
            const data = await Product.getProductDetail(id)
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(404).json(`${error.message}`)
    }
}

static async addProduct(req, res){
    //if add product make sure the id is similar to the user because it is foreign key
    try {
        const userId = isAuth(req)
        if(userId !== null){
            const data = req.body
            const existProduct = await Product.getProductDetail(data.id)
            if(existProduct[0]){
                return res.status(400).json({message : "product exist"})
            }
            await Product.addProduct(data)
            res.status(201).json(data) 
        }
    } catch (error) {
        res.status(400).json(`${error.message}`)
    }
    
}

static async deleteProduct(req, res){
    try {
        const userId = isAuth(req)
        if(userId !== null){
            const id = req.params.id
            await Product.deleteProduct(id)
            res.status(200).json({message : `${id} is deleted`})
        }
    } catch (error) {
        res.status(400).json(`${error.message}`)
    }
}

static async updateProduct(req, res){
    try {
        const userId = isAuth(req)
        if(userId !== null){
            const id = req.params.id
            const exitProduct = await Product.getProductDetail(id)
            const data = req.body
            if(!exitProduct[0]){
                res.status(400).json({message : "product undefined"})
            }
   
            await Product.updateProduct(data)
            res.status(200).json({message : "data updated"})
        }
    } catch (error) {
        res.json(`${error.message}`)
    }
    
}

}

module.exports = Controller;