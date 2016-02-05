/**
 * Created by Administrator on 2016/1/25.
 */
//封装ajax
function ajax(obj){
    var xhr=(function(){
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
    })();
    obj.url=obj.url+'?rand='+Math.random();
    obj.data=(function(data){
        var arr=[];
        for (var i in data){
            arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
        }
        return arr.join('&')//我们将创建一个数组，然后把它的所有元素放入一个字符串：
    })(obj.data);
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