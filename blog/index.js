

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
        login.center(350, 250).show();
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    $('#login .close').click(function () {
        login.hide();
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
        reg.center(600, 550).show();
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    $('#reg .close').click(function () {
        reg.hide();
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
    //ͼƬ����
    var photo_big = $('#photo_big');
    photo_big.center(620, 511).resize(function () {
        if (reg.css('display') == 'block') {
            screen.lock();
        }
    });
    //ͼƬ���ʱ
    $('#photo dl dt img').click(function () {
       //���򵯿�
        photo_big.center(620, 511).css('display', 'block');
        //�������ϼӶ���Ч��
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
        //ͼƬ����
        var temp_img = new Image();
        temp_img.src = $(this).attr('bigsrc');
        //��temp_img�������֮��
        $(temp_img).bind('load', function () {
            $('#photo_big .big img').attr('src', temp_img.src).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
        });
        //��ȡ����ͼƬ������
        var children =this.parentNode.parentNode;
        prev_next_img(children);
    });
    //ͼƬ��һ��
    $('#photo_big .big .left').click(function(){
        $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
        var current_img=new Image();
        current_img.src=$(this).attr('src');
        $(current_img).bind('load',function(){
            $('#photo_big .big img').attr('src',current_img.src).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
        })
        var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
        prev_next_img(children);
    });
    //ͼƬ��һ��
    $('#photo_big .big .right').click(function(){
        $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
        var current_img=new Image();
        current_img.src=$(this).attr('src');
        $(current_img).bind('load',function(){
            $('#photo_big .big img').attr('src',current_img.src).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
        })
        var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
        prev_next_img(children);
    });
    function prev_next_img(children){
        var prev=prevIndex($(children).index(),children.parentNode);
        var next=nextIndex($(children).index(),children.parentNode);
        //console.log(prev+'��'+next);
        var prev_img=new Image();
        var next_img=new Image();
        prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
        next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
        $('#photo_big .big .left').attr('src', prev_img.src);
        $('#photo_big .big .right').attr('src', next_img.src);
        $('#photo_big .big img').attr('index',$(children).index());
        $('#photo_big .big .index').html(parseInt($(children).index())+1+'/'+$('#photo dl dt img').length())
    }
    $('#photo_big .close').click(function () {
        photo_big.css('display', 'none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });

        $('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
    });
    //ͼƬ��껬��ʱ
    $('#photo_big .big .left').hover(function(){
        $('#photo_big .big .sl').animate({
            attr : 'o',
            target : 50,
            t : 30,
            step : 10
        });
    },function(){
        $('#photo_big .big .sl').animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10
        });
    });
    $('#photo_big .big .right').hover(function(){
        $('#photo_big .big .sr').animate({
            attr : 'o',
            target : 50,
            t : 30,
            step : 10
        });
    },function(){
        $('#photo_big .big .sr').animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10
        });
    });

    //��ק
    login.drag($('#login h2').last());
    reg.drag($('#reg h2').last());
    photo_big.drag($('#photo_big h2').last());
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
        $('#reg .info_user').show();
        $('#reg .error_user').hide();
        $('#reg .succ_user').hide();
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_user').hide();
            $('#reg .error_user').hide();
            $('#reg .succ_user').hide();
        } else if (!check_user()) {
            $('#reg .error_user').show();
            $('#reg .info_user').hide();
            $('#reg .succ_user').hide();
        } else {
            $('#reg .succ_user').show();
            $('#reg .error_user').hide();
            $('#reg .info_user').hide();
        }
    });
    function check_user(){
        if (/[\w]{2,20}/.test(trim($('form').form('user').value()))) return true;
    }

    //������֤
    $('form').form('pass').bind('focus', function () {
        $('#reg .info_pass').show();
        $('#reg .error_pass').hide();
        $('#reg .succ_pass').hide();
    }).bind('blur', function () {
        //�����������һʲô����д�Ĳ���ʾ���ڶ�������֤���ϸ����ʾ����
        //����������֤�ϸ���ʾͨ��
        if (trim($(this).value()) == '') {
            $('#reg .info_pass').hide();
        }else{
            if(check_pass()){
                $('#reg .info_pass').hide();
                $('#reg .error_pass').hide();
                $('#reg .succ_pass').show();
            } else {
                $('#reg .info_pass').hide();
                $('#reg .error_pass').show();
                $('#reg .succ_pass').hide();
            }
        }
    });

    //����ǿ����֤
    $('form').form('pass').bind('keyup', function () {
        check_pass();
    });
    //������֤����
    function check_pass(){
        var value = trim($('form').form('pass').value());
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
        if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
            return true;
        }else{
            return false;
        }
    }

    //����ȷ��
    $('form').form('notpass').bind('focus', function () {
        $('#reg .info_notpass').show();
        $('#reg .error_notpass').hide();
        $('#reg .succ_notpass').hide();
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_notpass').hide();
        }else{
            if(check_notpass(this)){
                $('#reg .info_notpass').hide();
                $('#reg .error_notpass').hide();
                $('#reg .succ_notpass').show();
            } else {
                $('#reg .info_notpass').hide();
                $('#reg .error_notpass').show();
                $('#reg .succ_notpass').hide();
            }
        }
    });
    function check_notpass(){
        if(trim($('form').form('notpass').value())==trim($('form').form('pass').value())) return true;
    }
    //����
    $('form').form('ques').bind('change',function(){
         if(check_ques()) $('#reg .error_ques').hide();
    });
    function check_ques(){
        if ($('form').form('ques').value() != 0) return true;
    }
    //�ش�
    $('form').form('ans').bind('focus',function(){
        $('#reg .info_ans').show();
        $('#reg .error_ans').hide();
        $('#reg .succ_ans').hide();
    }).bind('blur',function(){
        if (trim($(this).value()) == '') {
            $('#reg .info_ans').hide();
        }else if(check_ans()){
            $('#reg .info_ans').hide();
            $('#reg .error_ans').hide();
            $('#reg .succ_ans').show();
        }else{
            $('#reg .info_ans').hide();
            $('#reg .error_ans').show();
            $('#reg .succ_ans').hide();
        }
    });
    function check_ans(){
        if(trim($('form').form('ans').value()).length>=2&& trim($('form').form('ans').value()).length <= 32) return true;
    }
    //�����ʼ�
    $('form').form('email').bind('focus',function(){
        $('#reg .all_email').show();
        $('#reg .info_email').show();
        $('#reg .error_email').hide();
        $('#reg .succ_email').hide();
    }).bind('blur',function(){
        $('#reg .all_email').hide();
        if (trim($(this).value()) == '') {
            $('#reg .info_email').hide();
        }else if(check_email()){//��֤�����ַ��ͷ��β��ʼ��֤��
            $('#reg .info_email').hide();
            $('#reg .error_email').hide();
            $('#reg .succ_email').show();
        }else{
            $('#reg .info_email').hide();
            $('#reg .error_email').show();
            $('#reg .succ_email').hide();
        }
    });
    function check_email(){
        if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
    }
    //�����ʼ���ȫϵͳ����
    $('form').form('email').bind('keyup',function(){
        if($(this).value().indexOf('@')==-1) {
            $('#reg .all_email').show();
            $('#reg .all_email li span').html($(this).value());
        }else{
            $('#reg .all_email').hide();
        }
    })
    //�����ʼ���ȫϵͳ�����ȡ
    $('#reg .all_email li').bind('mousedown',function(){
        $('form').form('email').value($(this).text());
    });
    //PS��click�¼��ǵ������󴥷��ģ���blurʧȥ�˽����û�е�������Ԫ�أ������޷�����
    //�����ʼ���ȫϵͳ��������Ƴ�Ч��
    $('#reg .all_email li').hover(function(){
        $(this).css('background', '#e5edf2');
        $(this).css('color', '#369');
    },function(){
        $(this).css('background', 'none');
        $(this).css('color', '#666');
    })
    //������
    var year=$('form').form('year');
    var month=$('form').form('month');
    var day=$('form').form('day');
    var day30=[4,6,9,11];
    var day31=[1,3,5,7,8,10,12];
    //ע����
    for(var i=1950;i<=2020;i++){
        year.first().add(new Option(i,i),undefined);
    }
    //ע����
    for(var i=1;i<=12;i++){
        month.first().add(new Option(i,i),undefined);
    }
    //ע����
    year.bind('change',select_day);
    month.bind('change',select_day);
    day.bind('change', function () {
        if (check_birthday()) $('#reg .error_birthday').hide();
    });
    function check_birthday(){
        if(year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
    }
    function select_day() {
        if (year.value() != 0 && month.value() != 0) {
            day.first().options.length = 1;
            var cur_day=0;
            //�ж�һ�����м���
            if(inArray(day31,parseInt(month.value()))){
                cur_day=31;
            }else if(inArray(day30,parseInt(month.value()))){
                cur_day=30;
            }else{
                if(parseInt(year.value())%100!=0&&parseInt(year.value()%4==0)||parseInt(year.value())%400==0){
                    cur_day=29;
                }else{
                    cur_day=28;
                }
            }
            for (var i = 1; i <= cur_day; i++) {
                day.first().add(new Option(i, i), undefined);
            }
        } else {
            day.first().options.length = 1;
            //����� options.length ��������Ϊ 0,Select ����������ѡ��ᱻ�����
            // ��� options.length ���Ե�ֵ�ȵ�ǰֵС������������β����Ԫ�ؾͻᱻ������
        }
    }
    //��ע
    $('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
        setTimeout(check_ps,50);
    });
    //��β
    $('#reg .ps .clear').click(function(){
        $('form').form('ps').value($('form').form('ps').value().substring(0,5));
        //ճ���¼���������ճ�����ı���֮ǰ����
        check_ps;
    })
    function check_ps(){
        var num=5-$('form').form('ps').value().length;
        if(num>=0){
            $('#reg .ps').eq(0).css('display', 'block');
            $('#reg .ps .num').eq(0).html(num);
            $('#reg .ps').eq(1).css('display', 'none');
            return true;
        }else{
            $('#reg .ps').eq(0).css('display', 'none');
            $('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
            $('#reg .ps').eq(1).css('display', 'block');
            return false;
        }
    }
    $('form').form('sub').click(function(){
        var flag=true;
        if(!check_user()){
            $('#reg .error_user').show();
            flag=false;
        }
        if(!check_pass()){
            $('#reg .error_pass').show();
            flag=false;
        }
        if(!check_notpass()){
            $('#reg .error_notpass').show();
            flag=false;
        }
        if(!check_ques()){
            $('#reg .error_ques').show();
            flag=false;
        }
        if(!check_ans()){
            $('#reg .error_ans').show();
            flag=false;
        }
        if(!check_email()){
            $('#reg .error_email').show();
            flag=false;
        }
        if(!check_birthday()){
            $('#reg .error_birthday').show();
            flag=false;
        }
        if(!check_ps()){
            flag=false;
        }
        if(flag){
            ajax({
                method:'post',
                url:'ajax.php',
                data:$('form').eq(0).serialize(),
                success:function(text){
                    console.log(text);
                },
                async:true
            });
        }
        ajax({
            method:'post',
            url:'ajax.php',
            data:$('form').eq(0).serialize(),
            success:function(text){
                console.log(text);
            },
            async:true
        });
    })
    //�ֲ�����ʼ��
    $('#banner img').opacity(0);
    $('#banner img').eq(0).opacity(100);
    $('#banner ul li').eq(0).css('color','#333');
    $('#banner strong').html($('#banner img').eq(0).attr('alt'));
    //�ֲ���������
    var banner_index=1
    //�ֲ���������
    var banner_type=2;//1��ʾ͸���ȣ�2��ʾ���ҹ���
    //�Զ��ֲ���
    var banner_timer=setInterval(banner_fn,3000);
    //�ֶ��ֲ���
    $('#banner ul li').hover(function(){
        console.log($(this).index());
        clearInterval(banner_timer);
        banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
    },function(){
        banner_timer=setInterval(banner_fn,3000);
        banner_index=$(this).index()+1;
    })
    function banner(obj,prev){
        $('#banner ul li').css('color','#999');
        $(obj).css('color','#333');
        $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
        if(banner_type==1) {
            $('#banner img').eq(prev).animate({
                attr: 'o',
                target: 0,
                t: 30,
                step: 10
            }).css('zIndex', 1);
            $('#banner img').eq($(obj).index()).animate({
                attr: 'o',
                target: 100,
                t: 30,
                step: 10
            }).css('zIndex', 1);
        }else if(banner_type==2){
            $('#banner img').eq(prev).animate({
                attr:'x',
                target:-900,
                t:30,
                type:1
            }).opacity(100).css('zIndex', 1);
            $('#banner img').eq($(obj).index()).animate({
                attr : 'x',
                target : 0,
                t : 30,
                type : 1
            }).css('left', '900px').opacity(100).css('zIndex',2);
        }
    }
    function banner_fn(){
        if(banner_index>=$('#banner ul li').length()) banner_index=0;
        banner($('#banner ul li').eq(banner_index).first(),banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        banner_index++;
    }
    //�ӳټ���ͼƬ
    var wait_load=$('.wait_load');
    $(window).bind('scroll',function(){
        for(var i=0;i<wait_load.length();i++){
            var _this=wait_load.ge(i);
            if(getInner().height+getScroll().top>=offsetTop(_this)){
                $(_this).attr('src',$(_this).attr('xsrc')).animate({
                    attr : 'o',
                    target : 100,
                    t : 60,
                    step : 10
                });
            }
        }
    });
});
















