/**
 * 函数节流方法
 * @param {Function}   -  fn 延时调用函数
 * @param {Number}   -  delay 延迟多长时间
 * @param {Number}   -  atleast 至少多长时间触发一次
 * @return {Function}   -  延迟执行的方法
 */
module.exports = function (fn, delay, atleast) {
    var timer = null;
    var previous = null,
        atleast = atleast || 0;

    return function () {
        if(atleast){
            var now = +new Date();
            !previous && (previous = now);

            if ( now - previous > atleast ) {
                fn();
                previous = now;
            } else {
                throttleFn();
            }
        }else {
            throttleFn();
        }

    };
    function throttleFn(){
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
};
