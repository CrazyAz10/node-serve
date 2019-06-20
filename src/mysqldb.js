var mysql = require('mysql');

var mysqldb = function(opt) {
		if(!(this instanceof mysqldb)) {
			return new mysqldb(opt);
		}
		this.conn = mysql.createConnection(opt);
		 // console.log(this.conn);
};
	///数据查询
mysqldb.prototype.query = function(sql, param, callback) {
	this.conn.query(sql, param, function(error, rows) {
		if(error) throw error;
		callback(rows);
	});
};
///执行sql
mysqldb.prototype.execute = function(sql, param) {
	this.conn.query(sql, param, function(error, rows) {
		if(error) throw error;
	});
};

module.exports = mysqldb;