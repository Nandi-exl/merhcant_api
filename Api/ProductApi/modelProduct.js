const db = require('../../config/db')
 const { hash, compareSync } = require('bcrypt')

class Product {
static getAllproducts(){
    let sql = `SELECT * FROM products`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            try {
                resolve(result)
            } catch (error) {
               reject(error)
            }
        })
    })
}  

static getProductDetail(id){
    let sql = `SELECT * FROM products WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            try {
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })
}

static addProduct(data){
    const dataImput = {
        id : data.id,
        name : data.name,
        quantity : data.quantity,
        price : data.price
     }
    let sql = `INSERT INTO products SET ?`
    return new Promise((resolve, reject) => {
        db.query(sql, [dataImput], (err, result) => {
          if(err) throw err;
          resolve(result)
        })
    })
}


}

module.exports = Product;