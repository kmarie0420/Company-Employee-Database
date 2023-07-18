INSERT INTO department(id, name)
VALUES (001, "Dietary"),
       (002, "Human Resources"),
       (003, "Marketing"),
       (004, "Accounting");

INSERT INTO role(id, title, salary, department_id)
VALUES (200, "Cook", "18", 001),
       (201, "Human Resources", "80", 002),
       (202, "Advertising", "65", 003),
       (203, "DataAnalytics", "100", 004);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (100, "Brutus", "Springsting", 200, 44956),
       (101, "Captain", "America", 201, 44956),
       (102, "Tony", "Soprano", 202, 66532),
       (104, "Captain", "Marvel", 203, 22654);