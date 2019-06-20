//引用模块
var urllib = require('urllib'),
	cheerio = require('cheerio'),
	schedule = require("node-schedule");//定时任务

var order = function(opt) {
	if(!(this instanceof order)) {
		return new order(opt);
	}
	this.db = opt.db;
	this.cache = opt.cache;
	this.parent = opt.parent;
};


//异步post请求取数据
function postData(_data) {
	urllib.request(_data.url, {
		method: 'post',
		dataType: 'json',
		data: _data.data?_data.data:{},
	}, function(err, data, res) {
		_data.fun(data);
	});
}

//异步请求取数据
function getData(_data) {
	urllib.request(_data.url, {
		method: 'GET',
		dataType: 'json'
	}, function(err, data, res) {
		_data.fun(data);
	});
}

//时间戳转换成日期格式
function standardDateFormat(timestamp) {
	var date = new Date(timestamp); //timestamp是秒数，Date()参数要求是毫秒，所以要乘以1000;
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
	h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return(Y + M + D + h + m + s);
};

//查询数据库的日期
function selectTime(){
	var timePerDay = 3600 * 24;
  	var date = new Date(); //timestamp是秒数，Date()参数要求是毫秒，所以要乘以1000;
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
	var nowTime = new Date(Y + M + D);
	var nowStamp = parseInt(nowTime.getTime() / 1000); 
 	/** 29天以前 */ 
 	var day2 = nowStamp - timePerDay * 28;
 	var twoDays = new Date(day2 * 1000);  
 	var y2 = twoDays.getFullYear() + '-';
	var m2 = (twoDays.getMonth() + 1 < 10 ? '0' + (twoDays.getMonth() + 1) : twoDays.getMonth() + 1) + '-';
	var d2 = (twoDays.getDate() < 10 ? '0' + twoDays.getDate() : twoDays.getDate()) + " ";
 	var sTime = y2 + m2 + d2+'00:00:00';
 	return sTime;
} 

//日志入库process.exit();
function insertLog(opt) {}

//取当前时间
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

//数据存入redis
order.prototype.orders = function(param, callback){
	var qTime = selectTime();
	var self = this;
	var sql = 'select orderId,hashdata from ssp_jdorders where orderTime > ? ';
	var pa = [qTime];
	self.db.Link.getOrder({
		sql: sql,
		pa: pa
	}, function(rows) {
		var times = 0;
		self.cache.Josurl.setorders({
			data:rows,
			callback: function(v){
				times++;
				if(times == rows.length)
				{
					self.updata(param, callback);
				}
			}
		});
	});
}


module.exports = order;