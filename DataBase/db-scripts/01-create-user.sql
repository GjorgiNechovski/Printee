CREATE USER 'printee'@'localhost' IDENTIFIED BY 'printee';

GRANT ALL PRIVILEGES ON * . * TO 'printee'@'localhost';

ALTER USER 'printee'@'localhost' IDENTIFIED WITH mysql_native_password BY 'printee';