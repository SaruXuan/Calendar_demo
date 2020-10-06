$(document).ready(function(){

    //準備好event template
    var source = $('#event-template').html();
    var eventTemplate = Handlebars.compile(source);
    //尋訪從資料庫傳來所有events
    $.each(events, function(index, value){
        var eventUI = eventTemplate(value);
        var date = value['date'];
        //資料插入到各個對應日期中
        $('#calender').find('.date-block[data-date="' + date + '"]').find('.events').append(eventUI);
    });

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
                panel.selectedEvent = $(e.currentTarget).find('.event');
            }
        },
        open: function(isNew, e) {
            //打開時做的處理(清除舊的資料)
            panel.init(isNew, e);
            //每次打開時確保沒有error提示出現
            panel.hideError();
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
            //從#calender取得月
            var month = $('#calender').data('month');
            //從#calender取得年
            var year = $('#calender').data('year');
            //從date-block取得日期
            if ($(e.currentTarget).is('.date-block')) {
                var date = $(e.currentTarget).data('date');
            } else {
                var date = $(e.currentTarget).closest('.date-block').data('date');
                //done
                var done = $(e.currentTarget).data('done');
                $(panel.el).find('input[name="done"]').val(done);
            }
            //印出
            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            //日期資料存放input
            $(panel.el).find('input[name="year"]').val(year);
            $(panel.el).find('input[name="month"]').val(month);
            $(panel.el).find('input[name="date"]').val(date);
        },
        clear: function() {
            //清出事件所有選項
            $(panel.el).find('input').val('');
            $(panel.el).find('textarea').val('');
        },
        showError: function(msg){
            $(panel.el).find('.error-msg').addClass('open')
            .find('.alert').text(msg);
        },
        hideError: function() {
            $(panel.el).find('.error-msg').removeClass('open');
        },
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

        if($(e.currentTarget).data('done')) {
            $(panel.el).find('.done').text('undone');
        } else {
            $(panel.el).find('.done').text('done');
        }

        panel.selectedEvent = $(e.currentTarget);

        //Load之前的資料進panel
        var id = $(this).data('id');
        //AJAX - event detail
        //show on screen
        //老師的作法已在後端處理完
        $.post("event/read.php", { id: id },
            function (data, textStatus, jqXHR) {
                // console.log(data);
                $(panel.el).find('[name="id"]').val(data['id']);
                $(panel.el).find('.from input').val(data['start_time']);
                $(panel.el).find('.to input').val(data['end_time']);
                $(panel.el).find('.title input').val(data['title']);
                $(panel.el).find('.description textarea').val(data['description']);
            }
        ).fail(function(xhr){
            panel.showError(xhr.responseText);
        });
        //我的前端作法來讀取資料
        // var start_time, end_time, title, description, haveDescription;
        // $.each(events, function(index, value){
        //     if(value['id']==id){
        //         start_time = value['start_time'];
        //         end_time = value['end_time'];
        //         title = value['title'];
        //         if(value['description'].length > 0)
        //             description = value['description'];
        //             haveDescription = true;
        //     }
        // });
        // $(panel.el).find('.from input').val(start_time);
        // $(panel.el).find('.to input').val(end_time);
        // $(panel.el).find('.title input').val(title);
        // if(haveDescription)
        //     $(panel.el).find('.description textarea').val(description);
    });

    //time sorting
    var sortByTime = function(events) {
        var pool = [];
        events.$('.from').each(function(index, el){
            pool.append($(el).text());
        });
        console.log(pool);
    };


    //點擊按鈕觸發事件
    $(panel.el)
        .on('click', 'button', function(e){
            //避免append完後閃退
            e.preventDefault();
            if ($(this).is('.create') || $(this).is('.update')) {
                if($(this).is('.create'))
                    var action = 'event/create.php';
                else if($(this).is('.update'))
                    var action = 'event/update.php';
                //收集data(title, from, to, description)
                var data = $(panel.el).find('form').serialize();//所有資料轉成字串
                var dataArray = result = $('form').serializeArray();
                //AJAX - new jquery writing style, better!
                $.post(action, data)
                    .done(function (event, textStatus, jqXHR) {
                        if($(e.currentTarget).is('.update'))
                            panel.selectedEvent.remove();
                        var time = event['start_time'].split(":");//被比較的時間
                        //插入進events
                        var eventUI = eventTemplate(event);
                        //老師的作法-用each尋訪所有event
                        var isLast = true;
                        panel.selectedDateBlock.find('.event').each(function(index, currentEvent){
                            var eventFromTime = $(currentEvent).data('from').split(':');
                            var newEventFromTime = event['start_time'].split(':');
                            //比較是否有比目前的時間大，有的話換下一個比
                            if(eventFromTime[0]>newEventFromTime[0]){
                                $(currentEvent).before(eventUI);
                                isLast = false;
                                return false;
                            }else if(eventFromTime[0]==newEventFromTime[0] && eventFromTime[1]>newEventFromTime[1]){
                                $(currentEvent).before(eventUI);
                                isLast = false;
                                return false;
                            }
                        });
                        //用isLast判斷是否插入最後
                        if(isLast){//透過data-id來確認是否有插入了
                            panel.selectedDateBlock.find('.events').append(eventUI);
                        }
                        //與資料庫同步
                        // $.post('data.php', function(event){
                        //     events = event;
                        // });
                        panel.close();
                    })
                    .fail(function(xhr, textStatus, errorThrown){
                        panel.showError(xhr.responseText);
                    });
            }
            if ($(this).is('.cancel')) {
                //關閉事件視窗
                panel.close();
            }
            if($(this).is('.done')) {
                //槓掉
                if(panel.selectedEvent.data('done')==0) {
                    var data = {
                        'id': panel.selectedEvent.data('id'),
                        'done': 1
                    };
                    panel.selectedEvent.attr({'data-done': 1});
                    panel.selectedEvent.data('done', 1);
                }else if(panel.selectedEvent.data('done')==1) {
                    var data = {
                        'id': panel.selectedEvent.data('id'),
                        'done': 0
                    };
                    panel.selectedEvent.attr({'data-done': 0});
                    panel.selectedEvent.data('done', 0);
                }
                
                $.post("event/done.php", data,
                    function (event, textStatus, jqXHR) {
                        
                        panel.close();
                    },
                );
            }
            if ($(this).is('.delete')) {
                //id
                var id = panel.selectedEvent.data('id');
                //AJAX - delete.php
                $.post("event/delete.php", { id: id },
                    function (event, textStatus, jqXHR) {
                        //remove event
                        panel.selectedEvent.remove();
                        panel.close();
                    }
                );
            }
        })
    //點擊叉叉關閉事件視窗
        .on('click', '.close', function(e){
            $('button.cancel').click();
    });
});

