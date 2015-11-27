/**
 * Created by Administrator on 2015/11/20.
 */
$(function () {
    /*
    $('#button').hover(function () {
        $('#box').animate({
            'attr' : 'o',
            'start' : 0,
            'target' : 100,
            'step' : 7
        });
    },function(){
        $('#box').animate({
            'attr' : 'o',
            'start' : 100,
            'target' : 0,
            'step' : 7
        });
    });
    */
    $('.test1').hover(function(){
        console.log(this);
        $(this).animate({
            attr:'w',
            target:300,
            t:30,
            step:10
        })
    },function(){
        $(this).animate({
            attr:'w',
            target:100,
            t:30,
            step:10
        })
    })
/*
    $('#test').hover(function(){
       var _this=this;
        $(this).animate({
            attr:'o',
            target:0,
            t:50,
            step:30
        })
    },function(){
        $(this).animate({
            attr:'o',
            target:100,
            t:50,
            step:30
        })
    })
*/
    $('#test').click(function(){
        $(this).animate({
            t:30,
            step:10,
            attr:'o',
            target:0,
            //mul参数是一个对象，只有两种值：属性：目标值
            mul:{
              w:400,
                h:330,
                o:0
            }
        })
    })
});