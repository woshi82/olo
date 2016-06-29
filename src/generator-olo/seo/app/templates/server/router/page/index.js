/**
*@module page
*页面路由模块示例
*@index - 接口名称
*index - 接口名称
*/

// var midUser = require('../middleware/user.js');

module.exports = {
	// index: [midUser.hasLogin,function(req,res){
	// 	res.render('index',{username: req.session.username});
	// }]
	index : function(req,res){
		res.render('index',{username: req.session.username});
	}
};
