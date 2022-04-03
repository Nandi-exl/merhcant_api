const db = require('./db')

class databaseManipulation {
static connectDatabase() {
        db.connect((err) => {
            if(err) throw console.log("database not connected")
            console.log("database connected")
        })
    }

static createTableUser(){
    let sql = `CREATE TABLE IF NOT EXISTS user (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                password VARCHAR(255),
                name VARCHAR(255),
                adress VARCHAR(255),
                join_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                phone_number INT NOT NULL,
                refresh_token TEXT
    )`
    db.query(sql, (err) => {
        if(err) throw err
        console.log("table user created")
    })
}

static createProductTable(){
    let sql = `CREATE TABLE IF NOT EXISTS products(
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                quantity INT,
                price INT
    )`
    db.query(sql, (err) => {
        if(err) throw err
        console.log("table product created")
    })
}

}   

const activeDataBaseFunction = [
    databaseManipulation.connectDatabase(),
    // databaseManipulation.createTableUser(),
    // databaseManipulation.createProductTable()
]

module.exports = activeDataBaseFunction;