




/*

//JSON¼òµ¥Öµ
10
"hello"
true
null

//¶ÔÏó±íÊ¾
var box = {
	name : 'Lee', 
	age : 100
};
alert(box.name);

//JSON¶ÔÏó±íÊ¾
{
	"name" : "Lee",
	"age" : 100
}


//ÆÕÍ¨Êý×é
var box = [100, 'Lee', true];

//JSONÊý×é
'[100, "Lee", true]'

//PS£ºJSONËµ°×ÁË¾ÍÊÇÒ»¸ö×Ö·û´®£¬ËùÒÔÈÎºÎ±íÊ¾£¬¶¼Ó¦¸Ã¼ÓÉÏÒýºÅ±íÊ¾×Ö·û´®
//PS£ºJSON¶ÔÏóºÍÊý×é±ÈÆÕÍ¨¶ÔÏóºÍÊý×é£¬ÉÙÁË·ÖºÅ£¬ÉÙÁË±äÁ¿¸³Öµ£¬¶øÇÒ±¾ÉíÓ¦¸ÃÊÇ×Ö·û´®±íÊ¾

//×î³£ÓÃµÄJSON½á¹¹
[
	{
		"title" : "a",
		"num" : 1
	},
	{
		"title" : "b",
		"num" : 1
	},
	{
		"title" : "c",
		"num" : 1
	}
]

//Ä£Äâ¼ÓÔØJSONÊý¾Ý×Ö·û´®µÄ¹ý³Ì£¬var json = load('demo.json');		//°ÑJSON×Ö·û´®¼ÓÔØ½øÀ´²¢ÇÒ¸³Öµ¸øjson±äÁ¿
var json = '[{"title" : "a", "num" : 1},{"title" : "b", "num" : 2}]';		//Ä£Äâ¼ÓÔØJSON×Ö·û´®µÄ¹ý³Ì
//alert(typeof json);

//Ê¹ÓÃeval()À´Ö´ÐÐ×Ö·û´®ÀïµÄJS´úÂë
var box = eval(json);			//½âÎöJSON×Ö·û´®£¬ÈÃËû±ä³ÉJavaScript´úÂë
alert(box[1].title);


//PS£ºeval()²»°²È«


var json = '[{"title" : "a", "num" : 1},{"title" : "b", "num" : 2}]';	
//alert(JSON);
var box = JSON.parse(json);
alert(box[0].title);


var box = [
					{
						title : 'a',
						num : 1
					},
					{
						title : 'b',
						num : 2
					}
];
var json = JSON.stringify(box);
alert(json);

var box = [
					{
						title : 'a',
						num : 1,
						height : 177
					},
					{
						title : 'b',
						num : 2,
						height : 188
					}
];
var json = JSON.stringify(box, ['num', 'height']);
alert(json);

var box = [
					{
						title : 'a',
						num : 1,
						height : 177
					},
					{
						title : 'b',
						num : 2,
						height : 188
					}
];
var json = JSON.stringify(box, function (key, value) {
	if (key == 'title') {
		return 'Mr.' + value;
	} else {
		return value;
	}
});
alert(json);


//PS£º»ðºü3.5ºÍ3.6ÔÚ×î³õÖ§³ÖJSONµÄÊ±ºòstringify·½·¨ÓÐ¸öÐ¡BUG£¬Ö´ÐÐfunction»á³ö´í
//PS£ºÏÖÔÚ»ðºüµÄ°æ±¾ÊÇ17.0£¬ËùÒÔ3.5ºÍ3.6µÄÊÐ³¡·Ý¶î¿ÉÒÔºöÂÔ²»¼Æ£¬Ã»±ØÒªµ¥¶À¼æÈÝ


var box = [
					{
						title : 'a',
						num : 1,
						height : 177
					},
					{
						title : 'b',
						num : 2,
						height : 188
					}
];
var json = JSON.stringify(box, ['title', 'num'], 4);
alert(json);


var box = [
					{
						title : 'a',
						num : 1,
						height : 177
					},
					{
						title : 'b',
						num : 2,
						height : 188
					}
];
var json = JSON.stringify(box, null, 4);
alert(json);


var box = [
					{
						title : 'a',
						num : 1,
						height : 177,
						toJSON : function () {
							return this.title;
						}
					},
					{
						title : 'b',
						num : 2,
						height : 188,
						toJSON : function () {
							return this.title;
						}
					}
];
var json = JSON.stringify(box, null, 4);
alert(json);

*/




// var json = '[{"title" : "a", "num" : 1},{"title" : "b", "num" : 2}]';	
// var box = JSON.parse(json, function (key, value) {
// 	if (key == 'title') {
// 		return 'Mr.' + value;
// 	} else {
// 		return value;
// 	}
// });
// alert(box[0].title);


var json='[{"title":"zhenglei","num":2},{"title":"yanrui","num":"5"}]';
var box=JSON.parse(json,function(key,value){
	if(key=='title'){
		return value+'好帅';
	}else{
		return value;
	}
});
alert (box[0].title);

