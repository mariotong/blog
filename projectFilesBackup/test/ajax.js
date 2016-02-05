/**
 * Created by Administrator on 2016/1/25.
 */

/*
//使用同步
addEvent(document,'click',function(){
    var xhr=new createXHR();//创建XHR对象
    xhr.open('get','ajax.php?rand='+Math.random(),false)//尊卑发送请求，以get方式请求
    xhr.send(null);//发送请求，get不需要数据提交
    console.log(xhr.responseText);
   // console.log(xhr.status);
   // console.log(xhr.statusText);
    if(xhr.status==200){
        console.log(xhr.responseText)
    }else{
        console.log('数据获得失败');
    }
});
*/
/*
两种头信息一种是response headers 和request headers
相应头信息是服务器返回的信息，客户端可以获取，但不可以设置
请求头信息，客户端发送的信息，客户端可以设置，但不可以获取
* */
//使用异步的方式
/*
addEvent(document,'click',function(){
    var xhr=new createXHR();//创建XHR对象
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4) {
            if (xhr.status == 200) {
                alert(xhr.responseText)
            } else {
                alert('数据获得失败');
            }
        }
    };
    xhr.open('get','ajax.php?rand='+Math.random(),true)//尊卑发送请求，以get方式请求
    xhr.send(null);//发送请求，get不需要数据提交
});
*/
/*
//get请求
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
                //跳过
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

//post请求
addEvent(document,'click',function(){
    var xhr=new createXHR();
    var url='ajax.json?rand='+Math.random();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                alert(xhr.responseText)
            }else{
                //跳过
            }
        }
    }
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zhenglei&age=20',true);
    //xhr.open('get','ajax.php?rand='+Math.random()+'&name=zheng&lei&age=20',true);
    xhr.open('post',url,true);//第一步改为post
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//第三部，模拟表单提交
    xhr.send('name=lee&age=100');//第二步将名值对放入send方法里
});



*/



//特殊字符，需要通过encodeURIComponent来编码解决
/*
//头信息
addEvent(document,'click',function(){
    var xhr=new createXHR();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                console.log(xhr.getAllResponseHeaders());
                console.log(xhr.getAllResponseHeaders('ContentType'));
            }else{
                //跳过
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
                //跳过
            }
        }
    }else{
        throw new Error('你的系统浏览器不支持')
    }
}
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    }
}
//名值对转换为字符串
function params(data){
    var arr=[];
    for (var i in data){
        arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
    }
    return arr.join('&')//我们将创建一个数组，然后把它的所有元素放入一个字符串：
}
//封装ajax
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
            alert('你的系统不支持')
        }
    }
}
//调用ajax
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