var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: 3306,
  database: 'gg'
});
module.exports = {
    //查找菜品数据总数,及开始显示数据
  	select: function(tsql, tableName,callback){
          pool.query(`select count(id) from ${tableName}`, function(error, total){
                  pool.query(tsql, function(error, rows){
                      data = [total, rows]
                      callback(data);
              })
          })
  	},
    //查找菜品数据总数,及开始显示数据
    orderSelect: function(tsql, tableName, ordercode, callback){
          pool.query(`select count(id) from ${tableName} where ordercode='${ordercode}'`, function(error, total){
                  pool.query(tsql, function(error, rows){
                      data = [total, rows]
                      callback(data);
              })
          })
    },
    //搜索
    search: function(totalSql, tsql, callback){
          pool.query(totalSql, function(error, total){
              pool.query(tsql, function(error, rows){
                  data = [total, rows];
                  callback(data);
              })
          })
    },
    //修改数据
    update: function(tsql, callback){
          pool.query(tsql, function(error, rows){
              callback(rows);
          })
    },
    //修改分類
    updateClass: function(tsql, newSql,callback){
          pool.query(tsql, function(error, rows_1){
              pool.query(newSql, function(error, rows_2){
                  var data = [rows_1, rows_2]
                  callback(data);
              })
          })
    },
    //分页
    turnPage: function(tsql, callback){
        pool.query(tsql, function(error, rows){
            callback(rows);
        })
    },
    //查找分类
    selectClass:function(tsql, callback){
        pool.query(tsql, function(error, rows){
            callback(rows);
        })
    },
    //查找最大编码
    selectNumber:function(tsql, callback){
        pool.query(tsql, function(error, rows){
            callback(rows);
        })
    },
    //添加数据
    insert:function(tsql, callback){
        pool.query(tsql, function(error, rows){
            callback(rows);
        })
    }

}