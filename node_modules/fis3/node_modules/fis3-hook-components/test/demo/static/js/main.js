// components 下面的 js 可以直接通过模块名字引用。
var $ = require('jquery');
require('jquery-ui/tabs');

// 创建 tabs
$('#tabs')
  .tabs({
    load: function(event, ui) {
      // 当第二个 tab 加载完成后，动态初始化日历控件
      if (ui.tab.index() === 1) {

        require(['jquery-ui/datepicker', 'jquery-ui/i18n/datepicker-zh-CN'],
          function() {
            $('#datepicker').datepicker();
          }
        );
      }
    }
  })
  // Make the tabs visible now that the widget has been instantiated.
  .removeClass('invisible');