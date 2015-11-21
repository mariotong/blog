/**
 * Created by Administrator on 2015/11/12.
 */
$(function(){
    //个人中心
    $('.member').hover(function(){
        $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
        $('.member_ul').show();
    },function(){
        $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
        $('.member_ul').hide();
    });
    //登录框
    var login=$('#login');
    var screen=$('#screen');
    //console.log(document.documentElement);
    //login.addClass('red');
    //login.addClass('red');
    //login.remove('red');
    $('#header .login').click(function () {
        login.center(350,250);
        login.show();
        screen.lock();
    });
    $('#login .close').click(function(){
        login.hide();
        screen.unlock();
    });
    login.center(350,250).resize(function(){
        if(login.css('display')=='block') {
            screen.lock();
        }
    });
    //拖拽
    login.drag($('#login h2').last(),$('#login .other').first());

});
