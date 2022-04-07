const db = require('./db')

class databaseManipulation {
static connectDatabase() {
        db.connect((err) => {
            if(err) throw console.log("database not connected")
            console.log("database connected")
        })
    }

static createTableUser(){
    const sql = `CREATE TABLE IF NOT EXISTS user (
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
    const sql = `CREATE TABLE IF NOT EXISTS products(
                id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                quantity INT,
                price INT,
                FOREIGN KEY (id) REFERENCES user(id)
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