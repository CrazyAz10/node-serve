var conn;

var db = function(opt) {
	if(!(this instanceof db)) {
		return new db(opt);
	}
	this.conn = require('./src/mysqldb')(opt);
	////子类实现
	this.Link = require('./db/link')({conn:this.conn});
};

module.exports = db;