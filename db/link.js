// model层
var conn = null;
var link = function(opt){
	if (!(this instanceof link)) {
	    return new link(opt);
	}
	this.conn = opt.conn;
};

///根据guid获取网址信息
link.prototype.getByGUID = function(opt,_callback){
	var _self = this;
	var _field = (opt.field)?opt.field:'*';
	var _sql = 'select '+_field+' from ssp_linkurl where guid=?';
	var _param = [opt.guid];
	_self.conn.query(_sql,_param,function(rows){
		var _re =(rows)?rows[0]:undefined;
		_callback(_re);
	});
};

///根据网址ID获取目标网址列表
link.prototype.getResList = function(opt,_callback){
	var _self = this;
	var _field = (opt.field)?opt.field:'*';
	var _sql = 'select '+_field+' from ssp_linkres where pid=?';
	var _param = [opt.linkid];
	_self.conn.query(_sql,_param,function(rows){
		_callback(rows);
	});
};


link.prototype.getOrder = function(opt,_callback){
	var _self = this;
	var querySql = opt.sql;
	var _param = opt.pa;
	_self.conn.query(querySql,_param,function(rows){
		if(rows!=''){
			_callback(rows);
		}else{
			_callback('');
		}
	});
};

link.prototype.orderIns = function(opt,_callback){
	var _self = this;
	var querySql = opt;
//	console.log(querySql);
	_self.conn.query(querySql,[],function(rows){
		// console.log('新增结束：');
		// console.log(getNowFormatDate());
		_callback(rows);	
	});
};

link.prototype.orderdel = function(opt,_callback){
	var _self = this;
	var querySql = opt;
//	console.log(querySql);
	_self.conn.query(querySql,[],function(rows){
		// console.log('删除结束：');
		// console.log(getNowFormatDate());
		_callback(rows);	
	});
};

link.prototype.orderUp = function(opt,_callback){
	var _self = this;
	var querySql = opt.sql;
	var _param = opt.pa;
//	console.log(opt);
	_self.conn.query(querySql,_param,function(rows){
		console.log('更新结束：');
		console.log(getNowFormatDate());
		_callback(rows);
	});
};


function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

module.exports = link;
