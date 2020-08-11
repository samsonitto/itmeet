require('dotenv').config()

const mysql = require('mysql')

const pool = mysql.createPool({
  password: '',
  user: process.env.USER,
  database: process.env.DB,
  host: process.env.HOST,
  port: '3306'
})

let itfunDb = {}

itfunDb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM event`, (err, result) => {
      if (err) {
        return reject(err)
      }      
      return resolve(result)
    })
  })
}

itfunDb.addEvent = (data) => {
  return new Promise((resolve, reject) => {
    console.log('data', data)
    pool.query(`INSERT INTO event SET ?`, data, (err, result) => {
      if (err) {
        return reject(err)
      }      
      return resolve(result)
    })
  })
}

module.exports = itfunDb