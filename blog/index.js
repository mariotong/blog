

$(function () {

    //��������
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


    //���ֻ���
    var screen = $('#screen');

    //��¼��
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
        //��ִ�н��䶯����������Ϻ���ִ�йر�unlock
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

    //ע���
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

    //��ק
    login.drag($('#login h2').last());
    reg.drag($('#reg h2').last());

    //�ٶȷ����ʼ��λ��
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

    //�ٶȷ�������Ч��
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

    //��������
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

    //���˵�
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


    //����֤

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


    //������֤
    $('form').form('pass').bind('focus', function () {
        $('#reg .info_pass').css('display', 'block');
        $('#reg .error_pass').css('display', 'none');
        $('#reg .succ_pass').css('display', 'none');
    }).bind('blur', function () {
        //�����������һʲô����д�Ĳ���ʾ���ڶ�������֤���ϸ����ʾ����
        //����������֤�ϸ���ʾͨ��
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

    //����ǿ����֤
    $('form').form('pass').bind('keyup', function () {
        check_pass(this);
    });
    //������֤����
    function check_pass(_this){
        var value = trim($(_this).value());
        var value_length = value.length;
        var code_length=0;
        //��һ��������������֤6-20λ֮��
        if (value_length >= 6 && value_length <= 20) {
            $('#reg .info_pass .q1').css('color', 'green');
        } else {
            $('#reg .info_pass .q1').css('color', '#666');
        }

        //�ڶ���������������֤����ĸ�����ֻ�ǿ��ַ�������һ������
        if (value_length > 0 && !/\s/.test(value)) {
            $('#reg .info_pass .q2').css('color', 'green');
        } else {
            $('#reg .info_pass .q2').css('color', '#666');
        }
        //������������������֤����д��ĸ��Сд��ĸ�����֣��ǿ��ַ� �������ֻ�ƴ����
        //��һ�����ֵ�
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
        //��ȫ���𣬳��ȴ���10���������ֻ�ƴ
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

    //����ȷ��
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
    //�ش�
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
    //�����ʼ�
    $('form').form('email').bind('focus',function(){
        $('#reg .info_email').css('display', 'block');
        $('#reg .error_email').css('display', 'none');
        $('#reg .succ_email').css('display', 'none');
    }).bind('blur',function(){
        if (trim($(this).value()) == '') {
            $('#reg .info_email').css('display', 'none');
        }else if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))){//��֤�����ַ��ͷ��β��ʼ��֤��
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
















