


function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != 'undefined') {
		var version = [
									'MSXML2.XMLHttp.6.0',
									'MSXML2.XMLHttp.3.0',
									'MSXML2.XMLHttp'
		];
		for (var i = 0; version.length; i ++) {
			try {
				return new ActiveXObject(version[i]);
			} catch (e) {
				//跳过
			}	
		}
	} else {
		throw new Error('您的系统或浏览器不支持XHR对象！');
	}
}



//在Web程序上，GET一般是URL提交请求，比如：demo.php?name=Lee&age=100
//POST一般是Web表单提交：比如<form method="post"><input type="text" name="name" value="Lee"><input type="text" name="age" value="100">

//两种头信息：响应头信息->服务器返回的信息，客户端可以获取，但不可以设置。
//请求头信息->客户端发送的信息，客户端可以设置，但不可以获取。



//JSON加载
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	var url = 'demo.json?rand=' + Math.random();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var box = JSON.parse(xhr.responseText);
				alert(box);
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('get', url, true);
	xhr.send(null);			
});



/*
//POST请求
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
*/



/*
//GET请求
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	var url = 'demo.php?rand=' + Math.random();
	url = params(url, 'name', 'Lee');
	url = params(url, 'age', 100);
	alert(url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				alert(xhr.responseText);
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('get', url, true);
	xhr.send(null);			
});

function params(url, name, value) {
	url += url.indexOf('?') == -1 ? '?' : '&';
	url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return url;
}


//中文乱码问题，AJAX返回的数据其实是UTF8的，最简单的解决方案就是全部设置为UTF8即可
//特殊字符，需要通过encodeURIComponent来编码解决

*/


/*
//头信息
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				//alert(xhr.getAllResponseHeaders());						//获取全部响应头信息
				//alert(xhr.getResponseHeader('Content-Type'));	//获取单个响应头信息
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('get', 'demo.php?rand=' + Math.random(), true);
	xhr.setRequestHeader('myheader','Lee');			//设置请求头信息，一般没什么用，在POST提交请求有用
	xhr.send(null);			
});
*/



/*
//使用异步方式
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				
				alert(xhr.responseText);				
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('get', 'demo.php?rand=' + Math.random(), true);
	xhr.send(null);			
	//xhr.abort();			//取消异步请求	
});
*/


/*
使用同步方式
addEvent(document, 'click', function () {
	var xhr = createXHR();						//创建XHR对象
	xhr.open('get', 'demo.php?rand=' + Math.random(), false);	//准备发送请求，以get方式请求，url是demo.php，同步
	xhr.send(null);									//发送请求，get不需要数据提交，则填写为null;
	if (xhr.status == 200) {
		alert(xhr.responseText);					//打印服务器端返回回来的数据
	} else {
		alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
	}
});
*/


























