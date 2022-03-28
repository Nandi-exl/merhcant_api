const db = require('./db')

class databaseManipulation {
static connectDatabase() {
        db.connect((err) => {
            if(err) throw console.log("database not connected")
            console.log("database connected")
        })
    }
}   

module.exports = databaseManipulation;