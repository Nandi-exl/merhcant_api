const db = require('../../config/db')

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

static deleteProduct(id){
    let sql = `DELETE FROM products WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err;
            resolve(result)
        })
    })
}

static updateProduct(id, data){
    let dataUpdate = [
        data.id,
        data.name,
        data.quantity,
        data.price
    ]

    let sql = `UPDATE products SET
               id = COALESCE(?, id),
               name = COALESCE(?, name),
               quantity = COALESCE(?, quantity),
               price = COALESCE(?, price)
               WHERE id = ${id}
    `
    return new Promise((resolve, reject) => {
        db.query(sql, dataUpdate, (err, result) => {
            if(err) throw err;
            resolve(result)
        })
    })
}

}

module.exports = Product;