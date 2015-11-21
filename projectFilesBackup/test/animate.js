/**
 * Created by Administrator on 2015/11/20.
 */
$(function(){
    //var box=document.getElementById('box');
    //console.log(getStyle(box,'left'));
    //setInterval(function () {
    //    box.style.left = parseInt(getStyle(box, 'left'))+ 10 + 'px'
    //}, 50);
    $('#button').click(function(){
        $('#box').animate({
            'target':0,
            'attr':'height',
            'start':100,
            'type':1,
            't':100,
            'step':15
        });
    })
})