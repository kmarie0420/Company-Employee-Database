# Company-Employee-Database
Company Employee Database

## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Decription

A node.js application that takes in user input to view and manage employee's, their roles, and departments within a company. Making it convenient and overall appealing for the user. Being able to obtain/adjust company information in a quick and easy manner!

## Installation

First git clone this repo: `git clone git@github.com:kmarie0420/Company-Employee-Database.git`
Then run npm i at the root of this project in your local directory.

  * Uses the [mysql2 package](https://www.npmjs.com/package/mysql2).
  
  * Uses the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4).
  * Uses the [Console.Table package](https://www.npmjs.com/package/console.table).

## Usage Information

## Mock-Up

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](![Alt text](images/12-sql-homework-video-thumbnail.png))]

## Contributions

Kalynn Powell

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Github Repository

https://github.com/kmarie0420/Company-Employee-Database

## Walk-Through-Video

## Questions

If you have any questions or concerns, please email `kpowell0420@gmail.com` or https://github.com/kmarie0420 . 

## Credits
https://www.npmjs.com/package/console.table?activeTab=code 
https://www.npmjs.com/package/console.table 
https://www.npmjs.com/package/inquirer/v/8.2.4
https://www.npmjs.com/package/mysql2 
