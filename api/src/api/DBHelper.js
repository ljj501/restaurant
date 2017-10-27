var mysql = require('mysql');


var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: 3306,
  database: 'gg'
});

module.exports = {
    insert:function(_tables,_data,_callback){
         // {'name':'JR','age':20}
        pool.query(`insert into ${_tables} set ?`,  _data ,function(err,result){
            if(err){
                _callback({status:false})
            }else{
                _callback({status:true});
            }
        })
    },
    select:function(_tables,_data,_callback){
         // {'name':'JR'}
        var sql;
        for(var attr in _data){
            console.log(attr)
            console.log(_data[attr])
            sql = `select * from ${_tables} where ${attr} = '${_data[attr]}'`;
        }
        pool.query(sql,function(err,result){
            if(err) throw err;
            _callback({status:true,data:result});
        })
    },
    delete:function(_tables,_data,_callback){
        // {'name':'JR'}
        var sql;
        for(var attr in _data){
            sql = `delete from ${_tables} where ${attr} = '${_data[attr]}'`
            
        }
        pool.query(sql,function(err,result){
            if(err) throw err;
            _callback({status:true,data:result});
        })
    },
    updata:function(_tables,_data,_callback){
        // {where:{'name':'JR'},set:{'age':30}}
        var sql;
        for(var attr in _data.set){
            sql = `update ${_tables} set ${attr} = '${_data.set[attr]}'`
        }
        for(var Attr in _data.where){
            sql += `where ${Attr} = '${_data.where[Attr]}'`
        }
       pool.query(sql,function(err,result){
            if(err) throw err;
            _callback({status:true,data:result})
       })
        
    }
}