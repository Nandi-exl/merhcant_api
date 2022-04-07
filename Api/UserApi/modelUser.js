const db = require('../../config/db')

class User {
static getAllUsers(){
    const sql = `SELECT * FROM user`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            try {
                resolve(result)
            } catch (error) {
                reject(`${err.message}`)
            }
        })
    })
}



static getDetailUser(id){
    const sql = `SELECT * FROM user where id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            resolve(result)
        })
    })
}


static findUserByName(name){
    const sql = `SELECT name FROM user WHERE name = "${name}"`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err
            resolve(result)
        })
    })
}

static register (data, hashedPass) {

    //real
    const dataInputs = {
        name :data.name,
        password : hashedPass,
        adress : data.adress,
        phone_number : data.phone_number
    }

    const sql = `INSERT INTO user set ?`
    return new Promise((resolve, reject) => {
        db.query(sql, [dataInputs], (err, result) => {
                if(err) throw err
                console.log(result);
                resolve(result)
        })
    })
}



static deleteUser(id){
    const sql = `DELETE FROM user WHERE id = ${id}` 
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err
            resolve(result)
        })
    })
}


static findUserById(id){
    const sql = `SELECT id FROM user WHERE id = ${id}`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err
            resolve(result)
        })
    })
}

static updateUserDetail(id, data, hashedPass){
    const dataUpdate = [
        data.name,
        hashedPass,
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

static userLogin(name){
    const sql = `SELECT * FROM user WHERE name = "${name}"`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err
           console.log(result);
            resolve(result)
        })
    })
}

static pushRefreshtokenToDataBase(refreshtoken, name){
    const sql = `UPDATE user SET refreshtoken = "${refreshtoken}" WHERE name = "${name}"`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err;
            resolve(result)
        })
    })
}

static removeRefreshToken(id){
    const sql = `UPDATE user SET refreshtoken = NULL WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) throw err;
            resolve(result)
        })
    })
}
}

module.exports = User;