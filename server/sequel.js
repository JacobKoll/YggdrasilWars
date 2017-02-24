var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});
connection.connect();

var Login = {
  UserName: 'Jaek',
  Pass: 'PinkPants'
};
