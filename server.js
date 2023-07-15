// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer'); 
// import console.table
const cTable = require('console.table'); 

// connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Star19042094?',
    database: 'employee_db'
  });