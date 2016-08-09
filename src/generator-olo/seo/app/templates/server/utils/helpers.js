/**
 *@module helpers
 *@description Handlerbars Helper
 */
module.exports = {
    /** 增加比较逻辑 */
    compare: function() {
        var exps = [],
            operators = ['==', '===', '!=', '!==', '||', '<', '<=', '>', '>=', '&&', 'typeof'];
        try {
            var arg_len = arguments.length;
            var len = arg_len - 1;
            for (var j = 0; j < len; j++) {
                if (!isNaN(+arguments[j]) || operators.indexOf(arguments[j]) != -1) {
                    exps.push(arguments[j]);
                } else {
                    exps.push('"' + arguments[j] + '"');
                }
            }
            var result = eval(exps.join(' '));
            if (result) {
                return arguments[len].fn(this);
            } else {
                return arguments[len].inverse(this);
            }
        } catch (e) {
            throw new Error('Handlerbars Helper "expression" can not deal with wrong expression:' + exps.join(' ') + ".");
        }
    },
};
