/**
 * Created by Administrator on 2016/1/25.
 */

/*
//ʹ��ͬ��
addEvent(document,'click',function(){
    var xhr=new createXHR();//����XHR����
    xhr.open('get','ajax.php?rand='+Math.random(),false)//�𱰷���������get��ʽ����
    xhr.send(null);//��������get����Ҫ�����ύ
    console.log(xhr.responseText);
   // console.log(xhr.status);
   // console.log(xhr.statusText);
    if(xhr.status==200){
        console.log(xhr.responseText)
    }else{
        console.log('���ݻ��ʧ��');
    }
});
*/
/*
����ͷ��Ϣһ����response headers ��request headers
��Ӧͷ��Ϣ�Ƿ��������ص���Ϣ���ͻ��˿��Ի�ȡ��������������
����ͷ��Ϣ���ͻ��˷��͵���Ϣ���ͻ��˿������ã��������Ի�ȡ
* */
//ʹ���첽�ķ�ʽ
/*
addEvent(document,'click',function(){
    var xhr=new createXHR();//����XHR����
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4) {
            if (xhr.status == 200) {
                alert(xhr.responseText)
            } else {
                alert('���ݻ��ʧ��');
            }
        }
    };
    xhr.open('get','ajax.php?rand='+Math.random(),true)//�𱰷���������get��ʽ����
    xhr.send(null);//��������get����Ҫ�����ύ
});
*/
/*
//get����
addEvent(document,'click',function(){
    var xhr=new createXHR();
    var url='ajax.php?rand='+Math.random();
    url=params(url,'name','zheng&lei');
    url=params(url,'age','2&0');
    alert(url);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                alert(xhr.responseText)
            }else{
                //����
            }
        }
    }
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zhenglei&age=20',true);
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zheng&lei&age=20',true);
    xhr.open('get',url,true);
    xhr.setRequestHeader('myheader','Lee');
    xhr.send(null);
});
function params(url,name,value){
    url+=(url.indexOf('?')==-1?'?':'&');
    url+=encodeURIComponent(name)+'='+encodeURIComponent(value);
    return url;
}
*/

/*

//post����
addEvent(document,'click',function(){
    var xhr=new createXHR();
    var url='ajax.json?rand='+Math.random();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                alert(xhr.responseText)
            }else{
                //����
            }
        }
    }
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zhenglei&age=20',true);
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zheng&lei&age=20',true);
    xhr.open('post',url,true);//��һ����Ϊpost
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//��������ģ����ύ
    xhr.send('name=lee&age=100');//�ڶ�������ֵ�Է���send������
});



*/



//�����ַ�����Ҫͨ��encodeURIComponent��������
/*
//ͷ��Ϣ
addEvent(document,'click',function(){
    var xhr=new createXHR();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                console.log(xhr.getAllResponseHeaders());
                console.log(xhr.getAllResponseHeaders('ContentType'));
            }else{
                //����
            }
        }
    }
    xhr.open('get','ajax.php?rand='+Math.random(),true);
    xhr.setRequestHeader('myheader','Lee');
    xhr.send(null);
})*/
function createXHR(){
    if(typeof XMLHttpRequest!='undefined'){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject!='undefined'){
        var version=[
            'MSXML2.XMLHttp.6.0',
            'MSXML2.XMLHttp.3.0',
            'MSXML2.XMLHttp'

        ];
        for(var i=0;i<version.length;i++){
            try{
                return new ActiveXObject(version[i]);
            }catch(e){
                //����
            }
        }
    }else{
        throw new Error('���ϵͳ�������֧��')
    }
}
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    }
}
//��ֵ��ת��Ϊ�ַ���
function params(data){
    var arr=[];
    for (var i in data){
        arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
    }
    return arr.join('&')//���ǽ�����һ�����飬Ȼ�����������Ԫ�ط���һ���ַ�����
}
//��װajax
function ajax(obj){
    var xhr=createXHR();
    obj.url=obj.url+'?rand='+Math.random();
    obj.data=params(obj.data);
    if(obj.method==='get') obj.url+=obj.url.indexOf('?')==-1?'?'+obj.data:'&'+obj.data;
    if(obj.async===true){
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                callback();
            }
        }
    };
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method=='post'){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(obj.data);
    }else{
        xhr.send(null);
    }
    if(obj.async===false){
        callback();
    }
    function callback(){
        if(xhr.status==200){
            obj.success(xhr.responseText);
        }else{
            alert('���ϵͳ��֧��')
        }
    }
}
//����ajax
addEvent(document,'click',function(){
    ajax(
        {
            method:'post',
            data:{
                'name':'leee',
                'age':100
            },
            url:'ajax.php',
            success:function(text){
                console.log(text);
            },
            async:true
        }
    )
})