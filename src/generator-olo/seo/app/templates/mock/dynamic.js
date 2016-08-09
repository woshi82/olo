var Mock = require('mockjs');
module.exports = function(req, res, next) {
    var mock_data =  Mock.mock( {
        "error": 0,
        "message": "ok",
        "data": {
            "time": 'The time is ' + Date.now(),
            "star|1-10": '★',
            "start|5": [{
                t:2
            }],
        }
    });
    res.send(mock_data);
};
