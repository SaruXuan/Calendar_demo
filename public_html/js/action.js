$(document).ready(function(){

    //將事件處理包成dic
    var panel = {
        el: '#info-panel',
        open: function(isNew, e) {
            //讓事件視窗出現在點擊附近而且不會超出母視窗
            var midwidth = $(window).width()/2;
            var onethirdheight = $(window).height()/3;
            var twothirdheight = $(window).height()*2/3;
            var clickobj;
            if (e.pageX > midwidth && e.pageY > twothirdheight) {
                clickobj = $(panel.el).addClass('open').css({
                    top: (e.pageY-380)+'px',
                    left: (e.pageX-250)+'px'
                });
            } else if (e.pageX > midwidth && e.pageY <= twothirdheight && e.pageY > onethirdheight) {
                clickobj = $(panel.el).addClass('open').css({
                    top: (e.pageY-190)+'px',
                    left: (e.pageX-250)+'px'
                });
            } else if (e.pageX > midwidth && e.pageY <= onethirdheight) {
                clickobj = $(panel.el).addClass('open').css({
                    top: e.pageY+'px',
                    left: (e.pageX-250)+'px'
                });
            } else if (e.pageX <= midwidth && e.pageY > twothirdheight) {
                clickobj = $(panel.el).addClass('open').css({
                    top: (e.pageY-380)+'px',
                    left: e.pageX+'px'
                });
            } else if (e.pageX <= midwidth && e.pageY <= twothirdheight && e.pageY > onethirdheight) {
                clickobj = $(panel.el).addClass('open').css({
                    top: (e.pageY-190)+'px',
                    left: e.pageX+'px'
                });
            } else {
                clickobj = $(panel.el).addClass('open').css({
                    top: e.pageY+'px',
                    left: e.pageX+'px'
                });
            }
            //標上日期
            panel.updateDate(e);
            //打開事件視窗時直接讓title可編輯
            clickobj.find('.event-input').focus();
            //判斷是新開還是更新
            if (isNew) {
                $(panel.el).addClass('new').removeClass('update');
            } else {
                $(panel.el
                    ).addClass('update').removeClass('new');
            }
        },
        close: function() {
            $(panel.el).removeClass('open');
        },
        updateDate: function(e) {
            //從date-block取得日期
            if ($(e.currentTarget).is('.date-block')) {
                var date = $(e.currentTarget).data('date');
            } else {
                var date = $(e.currentTarget).closest('.date-block').data('date');
            }
            //從#calender取得月
            var month = $('#calender').data('month');
            //印出
            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
        }
    };

    //雙擊跳出事件視窗
    $('.date-block').on('dblclick', function(e){
        //呼叫panel的open函式
        panel.open(true, e);
    });

    
    $('.date-block').on('dblclick', '.event', function(e){
        //停止event bubbling
        e.stopPropagation();
        //呼叫panel的open函式
        panel.open(false, e);
    });


    //點擊按鈕觸發事件
    $('#info-panel')
        .on('click', 'button', function(e){
            if ($(this).is('.create')) {

            }
            if ($(this).is('.update')) {

            }
            if ($(this).is('.cancel')) {
                panel.close();
            }
            if ($(this).is('.delete')) {

            }
        })
    //點擊叉叉關閉事件視窗
        .on('click', '.close', function(e){
            panel.close();
    });
});

