const db = require('../config/db')

class User {
static getAllUsers(){
    const sql = `SELECT * FROM user`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            try {
                resolve(result)
            } catch (error) {
                reject(new Error(`${err.message}`))
            }
        })
    })
}



static getDetailUser(id){
    let sql = `SELECT * FROM user where id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            resolve(result)
        })
    })
}


static findUserById(id){
    let sql = `SELECT id FROM user WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            resolve(result)
        })
    })
}

static register (data) {
    const dataInputs = [
        data.name,
        data.password,
        data.adress,
        data.phone_number
    ]

    const sql = `INSERT INTO user(
        name,
        password,
        adress,
        phone_number)
        VALUES (?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        db.query(sql, dataInputs, (err, result) => {
                if(err) throw err
                resolve(result)
        })
    })
}

static deleteUser(id){
    let sql = `DELETE FROM user WHERE id = ${id}` 
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err
            resolve(result)
        })
    })
}

static updateUserDetail(id, data){
    let dataUpdate = [
        data.name,
        data.password,
        data.adress,
        data.phone_number
    ]
    let sql = `UPDATE user SET 
               name = COALESCE(?, name),
               password = COALESCE(?, password),
               adress = COALESCE(?, adress),
               phone_number = COALESCE(?, phone_number)
               WHERE id = ${id}
    `
    return new Promise((resolve, reject) => {
        db.query(sql, dataUpdate, (err, result) => {
            if(err) throw err
            resolve(result)
        })
    })
}

}

module.exports = User;