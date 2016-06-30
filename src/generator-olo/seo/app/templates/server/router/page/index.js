/**
*@module page
*页面路由模块示例
*
*路由名称: ［中间件（可选）,函数］,
*路由名称: 函数
*/

// var midUser = require('../middleware/user.js');

module.exports = {
	// index1: [midUser.hasLogin,function(req,res){
	// 	res.render('index',{username: req.session.username});
	// }]
	index : function(req,res){
		res.render('index',{username: req.session.username});
	}
};
