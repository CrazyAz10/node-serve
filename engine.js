var db, cache;

var engine = function(opt) {
	if(!(this instanceof engine)) {
		return new engine(opt);
	}
	this.db = opt.db;

	var _opt = {
		parent: this,
		db: this.db
	};
	//子类实现
	this.Order = require('./engine/order')(_opt);
}
//
engine.prototype.privateRoter = function(opt) {
	var _self = this;
	if(!opt.req) {
		opt.callback('命令错误');
		return;
	}
	// var postData = eval('(' + opt.req.body + ')');

	_self.Order.getOrder(opt, function(v) {
		opt.callback(v);
	});

}
//
engine.prototype.privateclassify = function(opt) {
	var _self = this;
	if(!opt.req) {
		opt.callback('命令错误');
		return;
	}
	// var postData = eval('(' + opt.req.body + ')');

	_self.Order.putclassify(opt, function(v) {
		opt.callback(v);
	});
}
//
engine.prototype.privateissue = function(opt) {
	var _self = this;
	if(!opt.req) {
		opt.callback('命令错误');
		return;
	}
	// var postData = eval('(' + opt.req.body + ')');

	_self.Order.putissue(opt, function(v) {
		opt.callback(v);
	});
}
//
engine.prototype.deleterepetitive = function(opt) {
	var _self = this;
	if(!opt.req) {
		opt.callback('命令错误');
		return;
	}
	// var postData = eval('(' + opt.req.body + ')');

	_self.Order.quchong(opt, function(v) {
		opt.callback(v);
	});
}
module.exports = engine;