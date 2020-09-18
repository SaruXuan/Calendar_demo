$(document).ready(function(){
    //雙擊跳出事件視窗
    $('.date-block').on('dblclick', function(e){
        $('#info-panel').addClass('open');
    });
    //點擊按鈕觸發事件
    $('#info-panel')
        .on('click', 'button', function(e){
            if ($(this).is('.create')) {

            }
            if ($(this).is('.update')) {

            }
            if ($(this).is('.cancel')) {
                $('#info-panel').removeClass('open');
            }
            if ($(this).is('.delete')) {

            }
        })
    //點擊叉叉關閉事件視窗
        .on('click', '.close', function(e){
            $('button.cancel').click();
    });
});

