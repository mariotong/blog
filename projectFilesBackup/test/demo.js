/**
 * Created by Administrator on 2015/11/13.
 */
/*
addEvent(window,'load',function(){
    var oButton = document.getElementById('button');
    var link=document.getElementById('a');
    addEvent(oButton, 'click', fn1);
    addEvent(oButton, 'click', fn1);
    addEvent(oButton, 'click', fn1);
    //removeEvent(oButton, 'click', fn);

    function fn(e) {
        alert(e.clientX);
        alert(this.tagName);
    }
   function fn1(e){
       alert('1'+this.value+ e.clientX);
   }
    function fn2(e){
        alert('2'+this.value+ e.clientX);
    }
    function fn3(e){
        alert('3'+this.value+ e.clientX);
    }
    addEvent(a,'click',function(e){
        e.preventDefault();
    });
    addEvent(oButton,'click',function(e){
        e.stopPropagation();
        //alert('button');
    });
    addEvent(document,'click',function(e){
       // e.stopPropagation();
        alert('document');
    });
});
(function getState(){
  alert('');//闭包
})()

addEvent(window,'load',function(){
    //$('.zhenglei').css('color','green');
  //  $('.zhenglei').find('.black').css('color','red');
    $('.special .black .red').css('color','red');
    //console.log( $('.zhenglei'));
    //console.log($('.zhenglei').find('.red'));
    //console.log($('#zhenglei'));
})
*/
(function(){
    window.sys={};
    var ua =navigator.userAgent.toLowerCase();//用户代理字符串,toLowerCase()转化成小写的
    console.log(ua);
    console.log(ua.match(/msie ([\d.]+)/));
    console.log(ua.match(/firefox\/([\d.]+)/));
    console.log(ua.match(/chrome\/([\d.]+)/));
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    console.log(sys.ie);
    console.log(sys.firefox);
    console.log(sys.chrome);
})()
/*
addEvent(window,'load',function(){
    var oBtn=$().getId('button');
    addEvent(oBtn,'click',function(e){
        alert('oBtn');
        e.stopPropagation();//如果调用了stopPropagation();就不会传播到document上，也就不会触发注册在这个元素上的clic事件
    });
    addEvent(document,'click',function(e){
        alert('document');
        console.log(e.currentTarget==document.body);
        console.log(this);
        console.log(e.target);
    })
})
*/
//传统的DOM加载
/*
window.onload=function(){
    var box=$().getId('box');
    alert(box.innerHTML);

}
//如果有图片，那么图片加载完毕后，方可执行onload里面的内容
//浏览器加载顺序
//1、html解析完毕
//2、外部脚本及样式加载完毕
//3、脚本在文档内解析并执行
//4、HTML DOM完全构造起来//dom 操作在这步就可以调用
//5、图片和外部内容加载//加载慢
//6、网页完成加载
//非ie浏览器提供了一个DOMContentLoaded的方法
addEvent(document,'DOMContentLoaded',function(){
    var box=document.getElementById('box');
    alert(box.innerHTML);
})

//IE9以下不支持DOMContentLoaded,IE678模拟DOMContentLoaded
document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>')
//用到document的readyState的属性
//loading 正在加载文档
//complete 已经加载文档
var ie_loaded=document.getElementById('ie_loaded');
//判断是否完全加载完毕DOM
ie_loaded.onreadystatechange=function(){
    if(this.readyState=='complete'){
        var box=document.getElementById('box');
        alert(box.innerHTML);
    }
}
*/
addDomLoaded(function(){
    var box=document.getElementById('box');
    alert(box.innerHTML);
})