/**
 * Created by Administrator on 2015/11/12.
 */
(function () { //程序刚一加载完就立即执行
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;//储存的是版本号
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
    console.log(ua+'---'+sys.ie);
})();
//DOM加载
function addDomLoaded(fn){
    var timer=null;
    var isReady=false;
    function doReady(){
        if(timer) clearInterval(timer);
        if(isReady) return;
        isReady=true;
        fn();
    }
  if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit<525)){
     //开启定时器判断
     timer=setInterval(function(){
         if(document&&document.getElementById&&document.getElementByTagName&&document.body){
             doReady();
         }
     },1)
  }else if (document.addEventListener){//w3c
      addEvent(document,'DOMContentLoaded',function(){
          fn();
          removeEvent(document,'DOMContentLoaded',arguments.callee);
      });
  }else if (sys.ie&&sys.ie<9){
      var timer = null;
      timer = setInterval(function () {
          try {
              document.documentElement.doScroll('left');
              doReady();
          } catch (e) {};
      }, 1);
  }
}
function getInner(){
    if(typeof window.innerWidth!='undefined'){
        return{
            width:window.innerWidth,
            height : window.innerHeight
        }
    }else{
        return{
            width:document.documentElement.clientWidth,
            height : document.documentElement.clientHeight
        }
    }
}
//跨浏览器获取滚动条的位置
function getScroll(){
    return{
        top:document.documentElement.scrollTop||document.body.scrollTop,
        left:document.documentElement.scrollLeft||document.body.scrollLeft
    }
}
//跨浏览器事件绑定
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    }/*else if (typeof obj.attachEvent != 'undefined') {
        obj.attachEvent('on' + type, function () {
            fn.call(obj,window.event);
        });//不能按顺序执行
    }*/else{
        //创建一个存放事件的哈希表
        if(!obj.events)obj.events={};
        //第一个执行时执行
        if(!obj.events[type]){
            //创建一个存放事件数组
            obj.events[type]=[];
            //把第一次的事件处理函数线储存到第一个位置上
            if(obj['on'+type])obj.events[type][0]=fn;
        }else{
            if(addEvent.equal(obj.events[type],fn))return false;
        }
        //从第二次开始我们就创建一个计数器来存储
        obj.events[type][addEvent.ID++]=fn;
        //执行事件处理函数
        obj['on'+type]=addEvent.exec;
    }
}
//为每个没见分配一个计数器
addEvent.ID=1;
//执行事件处理函数
addEvent.exec = function (event) {
    var e =event||addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es) {
        es[i].call(this, e);
    }
};
//同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
    for(var i in es){
        if(es[i]==fn)return true;
    }
    return false;
}
//把IE常用的Event对象配对到W3C中去(配对模式)
addEvent.fixEvent=function(event){
    event.preventDefault=addEvent.fixEvent.preventDefault;
    event.stopPropagation=addEvent.fixEvent.stopPropagation;
    return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
    this.returnValue=false;
};
addEvent.fixEvent.stopPropagation=function(){
    this.cancelBubble=true;
};

//跨浏览器删除事件
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else if (typeof obj.detachEvent != 'undefined') {
        obj.detachEvent('on' + type, fn);
    }
}
//跨浏览器获取Style
function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {//W3C
        value = window.getComputedStyle(element, null)[attr];
        //两个参数，一个是计算样式的元素和一个伪元素字符串，如（“：after”）如果不需要伪元素信息
        //第二个参数是null.getComputedStyle()方法返回一个对象，其中包含当前元素的所有计算的样式
    } else if (typeof element.currentStyle != 'undefined') {//IE
        value = element.currentStyle[attr];
        //ie不支持getComputedStyle()方法，但是在IE中，每个具有style属性的元素还有一个currentStyle属性，更上面差不多
    }
    return value;
}
//判断class是否存在
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
}
//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
    if (typeof sheet.insertRule != 'undefined') {//W3C
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') {//IE
        sheet.addRule(selectorText, cssText, position);
    }
}

//跨浏览器移出link规则
function deleteRule(sheet, index) {
    if (typeof sheet.deleteRule != 'undefined') {//W3C
        sheet.deleteRule(index);
    } else if (typeof sheet.removeRule != 'undefined') {//IE
        sheet.removeRule(index);
    }
}
//获取event对象
function getEvent(event){
    return event||window.event;
}
//阻止默认的行为
function preDef(event){
    var e=getEvent(event);
    if(typeof e.preventDefaulet!='undefined'){
        e.preventDefaule();
    }else{
        e.returnValue=false;
    }
}
//跨浏览器获取innerText
function getInnerText(element){
    return (typeof element.textContent=='string')?element.textContent:element.innerText;
}
//跨浏览器设置innerText
function setInnerText(element,text){
    if(typeof element.textContent=='string'){
        element.textContent=text;
    }else{
        element.innerText=text;
    }
}
//获取某一个元素到最外层定点的位置
function offsetTop(element){
    var top = element.offsetTop;
    var parent=element.offsetParent;
    while(parent!=null){
        top+=parent.offsetTop;
        parent=parent.offsetParent;
    }
    return top;
}
function inArray(array,value){
    for(i in array){
        if(array[i]===value) return true;
    }
    return false
}
//删除左后空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');//匹配空白字符、空格、制表符和换行符
}
function predef(e){
    e.preventDefault();
}
//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
    var length=parent.children.length;
    if(current==0) return length-1;
    return parseInt(current)-1
}
//获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
    var length=parent.children.length;
    if(current==length-1) return 0;
    return parseInt(current)+1;
}