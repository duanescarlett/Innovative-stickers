const Sequelize = require('sequelize')

// const database = process.env.DB_NAME
// const user = process.env.DB_U
console.log("**********************************************************8888")
// console.log(process.env['DB_NAME'])
// console.log(process.env.DB_NAME)
// const db_name = process.env.DB_NAME
// const db_user = process.env.DB_USER
// const db_host = process.env.DB_HOST
// const db_pass = process.env.DB_PASS

const db_name = 'bitgames'
const db_user = 'root'
const db_host = 'db_mysql'
const db_pass = 'P@ssw0rd'

const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// Test Database
sequelize
.authenticate()
.then(() => {
  console.log('---------------------------------------------')
  console.log('Connection has been established successfully.')
  console.log('---------------------------------------------')
})
.catch(err => {
  console.log('---------------------------------------------')
  console.error('Unable to connect to the database:', err)
  console.log('---------------------------------------------')
})

exports.Sequelize = sequelize