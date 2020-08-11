require('dotenv').config()
const express = require('express')
//const db = require('./db')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const mysqlConnection = mysql.createConnection({
  password: '',
  user: process.env.USER,
  database: process.env.DB,
  host: process.env.HOST,
  port: '3306'
})

mysqlConnection.connect((err) => {
  if(!err) {
    console.log('DB is connected');
  } else {
    console.log('DB connection FAILED!\nError : ' + JSON.stringify(err, undefined, 2))
  }
})

app.get('/api/events', async (req, res) => {
  try {
    mysqlConnection.query('SELECT * FROM event', (err, rows, fields) => {
      res.send(rows)
    })
  } catch (error) {
    console.log('Error', error)
    res.sendStatus(500)
  }
})

app.get('/api/users', async (req, res) => {
  try {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
      res.send(rows)
    })
  } catch (error) {
    console.log('Error', error)
    res.sendStatus(500)
  }
})

app.post('/api/events', async (req, res) => {
  const newEvent = req.body
  try {
    mysqlConnection.query('INSERT INTO event SET ?', newEvent, (err, rows, fields) => {
      if (!err) {
        mysqlConnection.query('SELECT * FROM event', (err, rows, fields) => {
          res.send(rows)
        })
      } else {
        res.send({error: err.message})
      }
      
    })
  } catch (error) {
    res.send({error: error.message})
  }
})

app.post('/api/users', async (req, res) => {
  const newUser = req.body
  try {
    mysqlConnection.query('INSERT INTO user SET ?', newUser, (err, rows, fields) => {
      if (!err) {
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
          res.send(rows)
        })
      } else {
        res.send({error: err.message})
      }
      
    })
  } catch (error) {
    res.send({error: error.message})
  }
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    mysqlConnection.query('DELETE FROM user WHERE userId = ?', req.params.id, (err, rows, fields) => {
      if (!err) {
        res.sendStatus(200)
      } else {
        res.send({error: err.message})
      }
    })
  } catch (error) {
    res.send({error: error.message})
  }
})

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)