$(document).ready(function(){

    //將事件處理包成dic
    var panel = {
        el: '#info-panel',
        selectedDateBlock: null,
        selectedEvent: null,
        init: function(isNew, e) {
            //清除前面填寫的資料
            panel.clear();
            //標上日期和資料傳遞
            panel.updateDate(e);
            //判斷是新開還是更新
            if (isNew) {
                $(panel.el).addClass('new').removeClass('update');
                panel.selectedDateBlock = $(e.currentTarget);
            } else {
                $(panel.el).addClass('update').removeClass('new');
                panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');
            }
        },
        open: function(isNew, e) {
            //打開時做的處理(清除舊的資料)
            panel.init(isNew, e);
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
            //打開事件視窗時直接讓title可編輯
            clickobj.find('.event-input').focus();
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
            //日期資料存放input
            $(panel.el).find('input[name="month"]').val(month);
            $(panel.el).find('input[name="date"]').val(date);

            console.log($(panel.el).find('input[name="month"]').val());
            console.log($(panel.el).find('input[name="date"]').val());
        },
        clear: function() {
            //清出事件所有選項
            $(panel.el).find('input').val('');
            $(panel.el).find('textarea').val('');
        }
    };

    //雙擊跳出事件視窗(NEW)
    $('.date-block').on('dblclick', function(e){
        //呼叫panel的open函式
        panel.open(true, e);
    });

    //雙擊跳出事件視窗(UPDATE)
    $('.date-block').on('dblclick', '.event', function(e){
        //停止event bubbling
        e.stopPropagation();
        //呼叫panel的open函式
        panel.open(false, e);

        panel.selectedEvent = $(e.currentTarget);

        //Load之前的資料進panel
        var id = $(this).data('id');
        //AJAX - event detail
        //show on screen
    });


    //點擊按鈕觸發事件
    $(panel.el)
        .on('click', 'button', function(e){
            //避免append完後閃退
            e.preventDefault();
            if ($(this).is('.create')) {
                //收集data(title, from, to, description)
                var data = $(panel.el).find('form').serialize();
                //AJAX
                // $.post("url", data,
                //     function (data, textStatus, jqXHR) {
                        
                //     },
                //     "dataType"
                // );
                //插入進events
                var source = $('#event-template').html();
                var eventTemplate = Handlebars.compile(source);
                var event = {
                    id: 1,
                    title: 'title',
                    start_time: '10:00',
                };
                var eventUI = eventTemplate(event);
                panel.selectedDateBlock.find('.events').append(eventUI);
                panel.close();
            }
            if ($(this).is('.update')) {
                //收集DATA
                //AJAX - update.php
                //改變UI
            }
            if ($(this).is('.cancel')) {
                //關閉事件視窗
                panel.close();
            }
            if ($(this).is('.delete')) {
                //id
                var id = panel.selectedEvent.data('id');
                //AJAX - delete.php
                //remove event
                panel.selectedEvent.remove();
                panel.close();
            }
        })
    //點擊叉叉關閉事件視窗
        .on('click', '.close', function(e){
            $('button.cancel').click();
    });
});

