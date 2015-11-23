/**
 * Created by Administrator on 2015/11/20.
 */
$(function () {
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
});