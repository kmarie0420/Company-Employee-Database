// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer'); 
// import console.table
const cTable = require('console.table'); 
require("dotenv")


// connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Star19042094?",
    database: 'employee_db'
  });

  // inquirer prompt for first action
const promptUser = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                "View employees by department",
                'Delete an employee']
    }])
    
    .then((answers) => {const { choices } = answers; 

      if (choices === "View all departments") {
        showDepartments();
      }

      if (choices === "View all roles") {
        showRoles();
      }

      if (choices === "View all employees") {
        showEmployees();
      }

      if (choices === "Add a department") {
        addDepartment();
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "View employees by department") {
        employeeDepartment();
      }

      if (choices === "Delete an employee") {
        deleteEmployee();
      }})};

// function to show all departments 
showDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};
// invoke action in terminal
promptUser()

// function to show all roles 
const showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  })
};

// function to show all employees 
const showEmployees = () => {
  console.log('Showing all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptUser();
  });
};

// function to add a department 
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!"); 

        showDepartments();
    });
  });
};

// function to add a role 
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (addSalary) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      const roleSql = `SELECT name, id FROM department`; 

      connection.query(roleSql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!"); 

              showRoles();
       });
     });
   });
 });
};

// function to add an employee 
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.fistName, answer.lastName]

    // grab roles from roles table
    const roleSql = `SELECT role.id, role.title FROM role`;
  
    connection.query(roleSql, (err, data) => {
      if (err) throw err; 
      
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));

      inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              const managerSql = `SELECT * FROM employee`;

              connection.query(managerSql, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager);

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                    connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!")

                    showEmployees();
              });
            });
          });
        });
     });
  });
};

// function to view employee by department
const employeeDepartment = () => {
  console.log('Showing employee by departments...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  });          
};


// function to delete employees
const deleteEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");
        
          showEmployees();
    });
  });
 });
};

