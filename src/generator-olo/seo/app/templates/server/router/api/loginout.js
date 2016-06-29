var request = require('request');
module.exports = {
	login: function (req, res) {
		var oData = {
				'm':'comment',
				'a':'getComment',
				'classid':'38',
				'id':'23697',
				'plid':'123058'
			},
			oData2 = {
				m: 'feedback',
				a: 'add'
			};
			console.log(112222);
		// request.post({
		// 	url:'http://www.biketo.com.cn/app.php', 
		// 	oData2:oData2
		// }, function (e, r, body) {
		request.get({
			url:'http://www.biketo.com.cn/app.php', 
			qs:oData,
			json:true
		}, function (e, r, body) {
			console.log(e);
			res.send(body);
		});
	}
};