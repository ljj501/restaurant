var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port: 3306,
  database: 'gg'
});
module.exports = {
	select: function(tsql, callback){
        // console.log(tsql);
		pool.query(tsql, function(error, rows){
            console.log(rows)
			callback(rows);
		})
	}
}