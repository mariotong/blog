

$(function () {

    //个人中心
    $('#header .member').hover(function () {
        $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
        $('#header .member_ul').show().animate({
            t : 30,
            step : 10,
            mul : {
                o : 100,
                h : 120
            }
        });
    }, function () {
        $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
        $('#header .member_ul').animate({
            t : 30,
            step : 10,
            mul : {
                o : 0,
                h : 0
            },
            fn : function () {
                $('#header .member_ul').hide();
            }
        });
    });


    //遮罩画布
    var screen = $('#screen');

    //登录框
    var login = $('#login');
    login.center(350, 250).resize(function () {
        if (login.css('display') == 'block') {
            screen.lock();
        }
    });
    $('#header .login').click(function () {
        login.center(350, 250).css('display', 'block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    $('#login .close').click(function () {
        login.css('display', 'none');
        //先执行渐变动画，动画完毕后再执行关闭unlock
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });
    });

    //注册框
    var reg = $('#reg');
    reg.center(600, 550).resize(function () {
        if (reg.css('display') == 'block') {
            screen.lock();
        }
    });
    $('#header .reg').click(function () {
        reg.center(600, 550).css('display', 'block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    $('#reg .close').click(function () {
        reg.css('display', 'none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });
    });

    //拖拽
    login.drag($('#login h2').last());
    reg.drag($('#reg h2').last());

    //百度分享初始化位置
    $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');

    /*
     addEvent(window, 'scroll', function () {
     $('#share').animate({
     attr : 'y',
     target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
     });
     });
     */

    $(window).bind('scroll', function () {
        $('#share').animate({
            attr : 'y',
            target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
        });
    });

    //百度分享收缩效果
    $('#share').hover(function () {
        $(this).animate({
            attr : 'x',
            target : 0
        });
    }, function () {
        $(this).animate({
            attr : 'x',
            target : -211
        });
    });

    //滑动导航
    var nav={};
    $('#nav .about li').hover(function () {
        var target = $(this).first().offsetLeft;
        $('#nav .nav_bg').animate({
            attr : 'x',
            target : target + 20,
            t : 30,
            step : 10,
            fn : function () {
                $('#nav .white').animate({
                    attr : 'x',
                    target : -target
                });
                nav.flag=true;
                $('#nav .about li').click(function() {
                    nav.flag = false;
                    nav.temTarget = target;
                })
            }
        });
    }, function () {
        if(nav.flag) {
            $('#nav .nav_bg').animate({
                attr: 'x',
                target: nav.temTarget!=undefined?nav.temTarget+20:20,
                t: 30,
                step: 10,
                fn: function () {
                    $('#nav .white').animate({
                        attr: 'x',
                        target: -nav.temTarget
                    });
                }
            });
        }
    });

    //左侧菜单
    $('#sidebar h2').toggle(function () {
        $(this).next().animate({
            mul : {
                h : 0,
                o : 0
            }
        });
    }, function () {
        $(this).next().animate({
            mul : {
                h : 150,
                o : 100
            }
        });
    });


    //表单验证

    //focus, blur
    //alert($('form').first().user.value);
    //$('form').form('user').value('bbb');

    $('form').form('user').bind('focus', function () {
        $('#reg .info_user').css('display', 'block');
        $('#reg .error_user').css('display', 'none');
        $('#reg .succ_user').css('display', 'none');
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_user').css('display', 'none');
            $('#reg .error_user').css('display', 'none');
            $('#reg .succ_user').css('display', 'none');
        } else if (!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))) {
            $('#reg .error_user').css('display', 'block');
            $('#reg .info_user').css('display', 'none');
            $('#reg .succ_user').css('display', 'none');
        } else {
            $('#reg .succ_user').css('display', 'block');
            $('#reg .error_user').css('display', 'none');
            $('#reg .info_user').css('display', 'none');
        }
    });


    //密码验证
    $('form').form('pass').bind('focus', function () {
        $('#reg .info_pass').css('display', 'block');
        $('#reg .error_pass').css('display', 'none');
        $('#reg .succ_pass').css('display', 'none');
    }).bind('blur', function () {
        //有三种情况第一什么都不写的不显示，第二密码验证不合格的显示错误，
        //第三密码验证合格显示通过
        if (trim($(this).value()) == '') {
            $('#reg .info_pass').css('display', 'none');
        }else{
            if(check_pass(this)){
                $('#reg .info_pass').css('display', 'none');
                $('#reg .error_pass').css('display', 'none');
                $('#reg .succ_pass').css('display', 'block');
            } else {
                $('#reg .info_pass').css('display', 'none');
                $('#reg .error_pass').css('display', 'block');
                $('#reg .succ_pass').css('display', 'none');
            }
        }
    });

    //密码强度验证
    $('form').form('pass').bind('keyup', function () {
        check_pass(this);
    });
    //密码验证函数
    function check_pass(_this){
        var value = trim($(_this).value());
        var value_length = value.length;
        var code_length=0;
        //第一个必须条件的验证6-20位之间
        if (value_length >= 6 && value_length <= 20) {
            $('#reg .info_pass .q1').css('color', 'green');
        } else {
            $('#reg .info_pass .q1').css('color', '#666');
        }

        //第二个必须条件的验证，字母或数字或非空字符，任意一个即可
        if (value_length > 0 && !/\s/.test(value)) {
            $('#reg .info_pass .q2').css('color', 'green');
        } else {
            $('#reg .info_pass .q2').css('color', '#666');
        }
        //第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
        //第一种数字的
        console.log(code_length);
        if(/[0-9]/.test(value)){
            code_length++;
        }
        if(/[a-z]/.test(value)){
            code_length++;
        }
        if(/A-Z/.test(value)){
            code_length++;
        }
        if(/[^0-9a-zA-Z]/.test(value)){
            code_length++;
        }
        if(code_length>=2){
            $('#reg .info_pass .q3').css('color', 'green');
        }else{
            $('#reg .info_pass .q3').css('color', '#666');
        }
        //安全级别，长度大于10，而且三种混拼
        if(value_length>=10&&code_length>=3){
            $('#reg .info_pass .s1').css('color', 'green');
            $('#reg .info_pass .s2').css('color', 'green');
            $('#reg .info_pass .s3').css('color', 'green');
            $('#reg .info_pass .s4').html('tall').css('color', 'green');
        }else if (value_length >= 8 && code_length >= 2) {
            $('#reg .info_pass .s1').css('color', '#f60');
            $('#reg .info_pass .s2').css('color', '#f60');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html('middle').css('color', '#f60');
        } else if (value_length >= 1) {
            $('#reg .info_pass .s1').css('color', 'maroon');
            $('#reg .info_pass .s2').css('color', '#ccc');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html('low').css('color', 'maroon');
        } else {
            $('#reg .info_pass .s1').css('color', '#ccc');
            $('#reg .info_pass .s2').css('color', '#ccc');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html(' ');
        }
        if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) return true;
    }

    //密码确认
    $('form').form('notpass').bind('focus', function () {
        $('#reg .info_notpass').css('display', 'block');
        $('#reg .error_notpass').css('display', 'none');
        $('#reg .succ_notpass').css('display', 'none');
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_notpass').css('display', 'none');
        }else{
            if(trim($(this).value())==trim($('form').form('pass').value())){
                $('#reg .info_notpass').css('display', 'none');
                $('#reg .error_notpass').css('display', 'none');
                $('#reg .succ_notpass').css('display', 'block');
            } else {
                $('#reg .info_notpass').css('display', 'none');
                $('#reg .error_notpass').css('display', 'block');
                $('#reg .succ_notpass').css('display', 'none');
            }
        }
    });
    //回答
    $('form').form('ans').bind('focus',function(){
        $('#reg .info_ans').css('display', 'block');
        $('#reg .error_ans').css('display', 'none');
        $('#reg .succ_ans').css('display', 'none');
    }).bind('blur',function(){
        if (trim($(this).value()) == '') {
            $('#reg .info_ans').css('display', 'none');
        }else if(trim($(this).value()).length>=2&& trim($(this).value()).length <= 32){
            $('#reg .info_ans').css('display', 'none');
            $('#reg .error_ans').css('display', 'none');
            $('#reg .succ_ans').css('display', 'block');
        }else{
            $('#reg .info_ans').css('display', 'none');
            $('#reg .error_ans').css('display', 'block');
            $('#reg .succ_ans').css('display', 'none');
        }
    });
    //电子邮件
    $('form').form('email').bind('focus',function(){
        $('#reg .info_email').css('display', 'block');
        $('#reg .error_email').css('display', 'none');
        $('#reg .succ_email').css('display', 'none');
    }).bind('blur',function(){
        if (trim($(this).value()) == '') {
            $('#reg .info_email').css('display', 'none');
        }else if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))){//验证邮箱地址从头到尾开始验证，
            $('#reg .info_email').css('display', 'none');
            $('#reg .error_email').css('display', 'none');
            $('#reg .succ_email').css('display', 'block');
        }else{
            $('#reg .info_email').css('display', 'none');
            $('#reg .error_email').css('display', 'block');
            $('#reg .succ_email').css('display', 'none');
        }
    });



});
















