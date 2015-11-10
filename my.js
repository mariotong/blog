
function params(url,name,value){
	url+=url.indexOf('?')==-1?'?':'&';
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
}



function createXHR(){
	if(typeof XMLHttpRequest!='undefined'){
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject!='undefined'){
		var version=['MSXML2.XMLHttp.6.0',
					 'MSXML2.XMLHttp.3.0',
					 'MSXML2.XMLHttp'];
	   for (var i=0; i<version.length; i++){
	   	    try{
	   	    	return new ActiveXObject(version[i]);
	   	    }catch(e){

	   	    }
	   }
	}else{
		throw new Error('your system not support');
	}
}

// addEvent(document, 'click', function () {
// 	var xhr = createXHR();		
// 	var url = 'demo.php?rand=' + Math.random();
// 	url = params(url, 'name', 'Lee');
// 	url = params(url, 'age', 100);
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState == 4) {
// 			if (xhr.status == 200) {
// 				alert(xhr.responseText);
// 			} else {
// 				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
// 			}	
// 		}
// 	};
// 	xhr.open('get', url, true);
// 	xhr.send(null);			
// });
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	var url = 'demo.php?rand=' + Math.random();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				alert(xhr.responseText);
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('post', url, true);							//第一步改为post
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		//第三步，模拟表单提交
	xhr.send('name=Lee&age=100');			//第二步将名值对放入send方法里
});