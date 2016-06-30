var request = require('request');
module.exports = {
	login: function (req, res) {
		var oData = {
				'm':'comment',
				'a':'getComment',
				'classid':'38',
				'id':'23697',
				'plid':'123058'
			};
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