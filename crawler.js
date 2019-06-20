var express = require('express');

var app = express();

app.use(function zuiBodyParser(req, res, next) {
	if(req._body) {
		return next();
	}
	req.body = req.body || {};

	var contentType = req.headers['content-type'];
	if('GET' == req.method || 'HEAD' == req.method) return next();
	req._body = true;
	var buf = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		buf += chunk;
	});
	req.on('end', function() {
		if(buf != '') {
			req.body = buf;
		}
		next();
	});
});

////调试
var isdebug = true;
/*********************************************************
	配置区
*/
if(isdebug) {
	var config = {
		// cache: {
		// 	server: "192.168.3.10",
		// 	port: 6379,
		// 	password: "shujuan",
		// 	database: 6
		// },
//		cache: {
//			server: "127.0.0.1",
//			port: 6379,
//			password: "root",
//			database: 1
//		},
		db: {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'test',
			port: 3306
		}
	};
} else {
	var config = {
		cache: {
			server: "127.0.0.1",
			port: 6379,
			password: "shujuanaidianjin",
			database: 6
		},
		db: {
			host: '',
			user: '',
			password: '',
			database: '',
			port: 3306
		}
	};
}

/*
	配置区结束
*********************************************************/

/* 
* controller层 
*/

// var cache = require('./cache')(config.cache);,cache: cache
////
var db = require('./db')(config.db);
////
var engine = require('./engine')({
	db: db
});
///启动定时刷新
// engine.oAuth.startRefreshToken();

//
app.get('/repetitive', function(req, res) {
	console.log(req);
	// engine.deleterepetitive({
	// 	req: req,
	// 	callback: function(_out) {
	// 		if(_out == '') {
	// 			res.send('{"code":"0","msg":""}');
	// 		} else {
	// 			if(_out.code) {
	// 				res.send(_out);
	// 			} else {
	// 				res.send('{"code":"1","msg":"' + _out + '"}');
	// 			}
	// 		}
	// 	}
	// });
});
app.use(function(req, res, next) {
	res.send('404');
});
app.use(function(err, req, res, next) {
	res.send('500');
});
app.listen(12348);
app.enable('trust proxy');
// 1级导航入库监听路径
// http://192.168.3.153:12348/private
// 分类级导航入库监听路径
// http://192.168.3.153:12348/classify
// 问题入库监听路径
// http://192.168.3.153:12348/issue
// http://192.168.3.153:12348/repetitive