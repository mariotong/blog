/**
 * Created by Administrator on 2015/11/12.
 */
(function () { //�����һ�����������ִ��
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;//������ǰ汾��
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
    console.log(ua+'---'+sys.ie);
})();
//DOM����
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
     //������ʱ���ж�
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
//���������ȡ��������λ��
function getScroll(){
    return{
        top:document.documentElement.scrollTop||document.body.scrollTop,
        left:document.documentElement.scrollLeft||document.body.scrollLeft
    }
}
//��������¼���
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    }/*else if (typeof obj.attachEvent != 'undefined') {
        obj.attachEvent('on' + type, function () {
            fn.call(obj,window.event);
        });//���ܰ�˳��ִ��
    }*/else{
        //����һ������¼��Ĺ�ϣ��
        if(!obj.events)obj.events={};
        //��һ��ִ��ʱִ��
        if(!obj.events[type]){
            //����һ������¼�����
            obj.events[type]=[];
            //�ѵ�һ�ε��¼��������ߴ��浽��һ��λ����
            if(obj['on'+type])obj.events[type][0]=fn;
        }else{
            if(addEvent.equal(obj.events[type],fn))return false;
        }
        //�ӵڶ��ο�ʼ���Ǿʹ���һ�����������洢
        obj.events[type][addEvent.ID++]=fn;
        //ִ���¼�������
        obj['on'+type]=addEvent.exec;
    }
}
//Ϊÿ��û������һ��������
addEvent.ID=1;
//ִ���¼�������
addEvent.exec = function (event) {
    var e =event||addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es) {
        es[i].call(this, e);
    }
};
//ͬһ��ע�ắ����������
addEvent.equal=function(es,fn){
    for(var i in es){
        if(es[i]==fn)return true;
    }
    return false;
}
//��IE���õ�Event������Ե�W3C��ȥ(���ģʽ)
addEvent.fixEvent=function(event){
    event.preventDefault=addEvent.fixEvent.preventDefault;
    event.stopPropagation=addEvent.fixEvent.stopPropagation;
    return event;
}
//IE��ֹĬ����Ϊ
addEvent.fixEvent.preventDefault=function(){
    this.returnValue=false;
};
addEvent.fixEvent.stopPropagation=function(){
    this.cancelBubble=true;
};

//�������ɾ���¼�
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else if (typeof obj.detachEvent != 'undefined') {
        obj.detachEvent('on' + type, fn);
    }
}
//���������ȡStyle
function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {//W3C
        value = window.getComputedStyle(element, null)[attr];
        //����������һ���Ǽ�����ʽ��Ԫ�غ�һ��αԪ���ַ������磨����after�����������ҪαԪ����Ϣ
        //�ڶ���������null.getComputedStyle()��������һ���������а�����ǰԪ�ص����м������ʽ
    } else if (typeof element.currentStyle != 'undefined') {//IE
        value = element.currentStyle[attr];
        //ie��֧��getComputedStyle()������������IE�У�ÿ������style���Ե�Ԫ�ػ���һ��currentStyle���ԣ���������
    }
    return value;
}
//�ж�class�Ƿ����
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
}
//����������link����
function insertRule(sheet, selectorText, cssText, position) {
    if (typeof sheet.insertRule != 'undefined') {//W3C
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') {//IE
        sheet.addRule(selectorText, cssText, position);
    }
}

//��������Ƴ�link����
function deleteRule(sheet, index) {
    if (typeof sheet.deleteRule != 'undefined') {//W3C
        sheet.deleteRule(index);
    } else if (typeof sheet.removeRule != 'undefined') {//IE
        sheet.removeRule(index);
    }
}
//��ȡevent����
function getEvent(event){
    return event||window.event;
}
//��ֹĬ�ϵ���Ϊ
function preDef(event){
    var e=getEvent(event);
    if(typeof e.preventDefaulet!='undefined'){
        e.preventDefaule();
    }else{
        e.returnValue=false;
    }
}
//���������ȡinnerText
function getInnerText(element){
    return (typeof element.textContent=='string')?element.textContent:element.innerText;
}
//�����������innerText
function setInnerText(element,text){
    if(typeof element.textContent=='string'){
        element.textContent=text;
    }else{
        element.innerText=text;
    }
}
//��ȡĳһ��Ԫ�ص�����㶨���λ��
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
//ɾ�����ո�
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');//ƥ��հ��ַ����ո��Ʊ���ͻ��з�
}
function predef(e){
    e.preventDefault();
}
//��ȡĳһ���ڵ����һ���ڵ������
function prevIndex(current,parent){
    var length=parent.children.length;
    if(current==0) return length-1;
    return parseInt(current)-1
}
//��ȡĳһ���ڵ����һ���ڵ������
function nextIndex(current,parent){
    var length=parent.children.length;
    if(current==length-1) return 0;
    return parseInt(current)+1;
}