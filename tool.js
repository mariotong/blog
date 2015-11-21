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
        value = parseInt(window.getComputedStyle(element, null)[attr]);
        //����������һ���Ǽ�����ʽ��Ԫ�غ�һ��αԪ���ַ������磨����after�����������ҪαԪ����Ϣ
        //�ڶ���������null.getComputedStyle()��������һ���������а�����ǰԪ�ص����м������ʽ
    } else if (typeof element.currentStyle != 'undefined') {//IE
        value = parseInt(element.currentStyle[attr]);
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
//ɾ�����ո�
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}