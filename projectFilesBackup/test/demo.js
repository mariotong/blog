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
  alert('');//�հ�
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
    var ua =navigator.userAgent.toLowerCase();//�û������ַ���,toLowerCase()ת����Сд��
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
        e.stopPropagation();//���������stopPropagation();�Ͳ��ᴫ����document�ϣ�Ҳ�Ͳ��ᴥ��ע�������Ԫ���ϵ�clic�¼�
    });
    addEvent(document,'click',function(e){
        alert('document');
        console.log(e.currentTarget==document.body);
        console.log(this);
        console.log(e.target);
    })
})
*/
//��ͳ��DOM����
/*
window.onload=function(){
    var box=$().getId('box');
    alert(box.innerHTML);

}
//�����ͼƬ����ôͼƬ������Ϻ󣬷���ִ��onload���������
//���������˳��
//1��html�������
//2���ⲿ�ű�����ʽ�������
//3���ű����ĵ��ڽ�����ִ��
//4��HTML DOM��ȫ��������//dom �������ⲽ�Ϳ��Ե���
//5��ͼƬ���ⲿ���ݼ���//������
//6����ҳ��ɼ���
//��ie������ṩ��һ��DOMContentLoaded�ķ���
addEvent(document,'DOMContentLoaded',function(){
    var box=document.getElementById('box');
    alert(box.innerHTML);
})

//IE9���²�֧��DOMContentLoaded,IE678ģ��DOMContentLoaded
document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>')
//�õ�document��readyState������
//loading ���ڼ����ĵ�
//complete �Ѿ������ĵ�
var ie_loaded=document.getElementById('ie_loaded');
//�ж��Ƿ���ȫ�������DOM
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