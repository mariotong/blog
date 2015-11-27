var $=function(args){
    return new Base(args);
};

function Base(args){
    //创建一个数组，来保存获取的节点和节点数组
    this.elements=[];
    if(typeof args=='string') {
        if (args.indexOf(' ') != -1) {
            var elements=args.split(' ');
            var childElements=[];//存放临时节点对象,最后赋值给this.elements
            var node=[];//用来存放父节点
            for(var i=0;i<elements.length;i++){
                if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
                switch(elements[i].charAt(0)){
                    case '#':
                        childElements=[]//清理点临时的节点，让父节点失效，子节点有效
                        childElements.push(this.getId(elements[i].substring(1)));
                        node=childElements;//保存父节点，因为临时节点要清掉，而父节点需要循环给支
                        break;
                    case'.':
                        childElements=[];
                        for (var j=0;j<node.length;j++){
                            var temps=this.getClass(elements[i].substring(1),node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node=childElements;
                        break;
                    default :
                        childElements = [];
                        for (var j = 0; j < node.length; j ++) {
                            var temps = this.getTagName(elements[i], node[j]);
                            for (var k = 0; k < temps.length; k ++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
            //console.log(this.elements);
        }else{
            //find模式
            switch (args.charAt(0)) {
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements=this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }
    } else if(typeof args == 'object'){
        if(args!=undefined){
            this.elements[0]=args;
        }
    }else if (typeof args=='function'){
        this.ready(args);
    }
}
Base.prototype.ready=function(fn){
    addDomLoaded(fn);
};
Base.prototype.getId=function(id){
    return document.getElementById(id)
};
Base.prototype.getTagName=function(tag,parentNode){
    var temps=[];
    var node=null;
    if(arguments.length==2){
        node=parentNode;
    }else{
        node=document;
    }
    var tags=node.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++) {
        temps.push(tags[i]);
    }
    return temps;
};
//获取某一个节点，并返回这个节点的对象
Base.prototype.ge=function(num){
    return this.elements[num];
};
//获取首个节点，并返回这个节点对象
Base.prototype.first = function () {
    return this.elements[0];
};
//获取末个节点，并返回这个节点对象
Base.prototype.last = function () {
    return this.elements[this.elements.length - 1];
};
//获取某一个节点，返回的是Base对象
Base.prototype.eq=function(num){
    var element=this.elements[num];
    this.elements=[];
    this.elements[0]=element;
    return this;
};
//获取当前节点的下一个元素节点
Base.prototype.next=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i]=this.elements[i].nextSibling;
        if(this.elements[i]==null)throw new Error('找不到下一个同级元素节点')
        if(this.elements[i].nodeType==3) this.next();
    }
    return this;
}
//获取class节点数组
Base.prototype.getClass=function(className,parentNode){
    var node=null;
    var temps=[];
    if(arguments.length==2){
        node=parentNode;
    }else{
        node=document;
    }
    var all= node.getElementsByTagName('*');
    for (var i=0;i<all.length;i++){
        if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
            temps.push(all[i]);
        }
    }
    return temps;
};
//设置css选择器子节点
Base.prototype.find =function(str){
    var childElements=[];
    for(var i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){
            case '#':
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps=this.getClass(str.substring(1),this.elements[i]);//返回来是一个数组
                for(var k=0;k<temps.length;k++){
                    childElements.push(temps[k]);//再把这个数组里面的元素都存在childElements这个临时数组里面
                }
                break;
            default:
                var temps=this.getTagName(str.substring(1),this.elements[i]);
                for(var k=0;k<temps.length;k++){
                    childElements.push(temps[k]);
                }
        }
    }
    this.elements=childElements;
    return this;
};
Base.prototype.css=function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){
            return getStyle(this.elements[i],attr);
        }
        this.elements[i].style[attr]=value;
    }
    return this;
};
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].innerText=str;
    }
    return this;
};
//获取某一个节点
Base.prototype.getElement=function(num){
    var element=this.elements[num];
    this.elements=[];
    this.elements.push(element);
    return this;
}
//添加Class
Base.prototype.addClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        //为了防止重复加类名，应该为正则匹配
        if(!hasClass(this.elements[i], className))
         this.elements[i].className+=' '+className;
    }
    return this;
};
//移除Class
Base.prototype.removeClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        //为了防止重复加类名，应该为正则匹配
        if(hasClass(this.elements[i], className))
        this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
    }
    return this;
};
//设置触发事件
Base.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=fn;
    }
    return this;
};
Base.prototype.addRule = function (num, selectorText, cssText, position) {
    var sheet = document.styleSheets[num];
    insertRule(sheet, selectorText, cssText, position);
    return this;
};
//移除link或style的CSS规则
Base.prototype.removeRule = function (num, index) {
    var sheet = document.styleSheets[num];
    deleteRule(sheet, index);
    return this;
};
//设置表单字段元素
Base.prototype.form=function(name){
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i][name];
    }
    return this;
}
//设置表单字段内容获取
Base.prototype.value=function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==0){
            return this.elements[i].value;
        }
        this.elements[i].value=str;
    }
    return this;
}
//设置时间发生器
Base.prototype.bind=function(event,fn){
    for (var i = 0; i < this.elements.length; i ++) {
       addEvent(this.elements[i],event,fn);
    }
    return this;
}
//设置鼠标移入移出的方法
Base.prototype.hover=function(over,out){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmouseover=over;
        this.elements[i].onmouseout=out;
    }
    return this;
};
//设置点击切换方法
Base.prototype.toggle=function(){
    for(var i= 0;i<this.elements.length;i++){
        //arguments[0]();
       //count(this.elements[i], arguments);
        (function (element, args) {
            var count = 0;//为每个element创建一个私有的count;
            addEvent(element, 'click', function () {
                args[count++ % args.length].call(this);
            });
        })(this.elements[i], arguments);//创建一个闭包
    }
    return this;
    /*function count(element,args){
     var count=0;//创建一个闭包，让它不是所有i都共用的
     addEvent(element,'click',function(){
     args[count++%args.length].call(this);
     })
     }*/
}
//显示或隐藏
Base.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
    return this;
};
Base.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
};
//设置物体居中
Base.prototype.center=function(width,height){
    var top=(getInner().height-height)/2;
    var left=(getInner().width-width)/2;
    for (var i=0; i<this.elements.length;i++){
        this.elements[i].style.top=top+'px';
        this.elements[i].style.left=left+'px';
    }
    return this;
};
//锁屏功能
Base.prototype.lock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.width= getInner().width+'px';
        this.elements[i].style.height=getInner().height+'px';
        this.elements[i].style.display='block';
        document.documentElement.style.overflow = 'hidden';
    }
    return this;
};
Base.prototype.unlock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
        document.documentElement.style.overflow = 'auto';
    }
};
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
    for(var i=0;i<this.elements.length;i++) {
        var element=this.elements[i];
        window.onresize = function(){
            fn();
            if(element.offsetLeft>getInner().width-element.offsetWidth){
                element.style.left=getInner().width-element.offsetWidth+'px';
            }
            if(element.offsetTop>getInner().height-element.offsetHeight){
                element.style.top=getInner().height-element.offsetHeight+'px';
            }
        };
    }
    return this;
};
//设置动画
Base.prototype.animate=function(obj){
    for(var i=0;i<this.elements.length;i++){
         var element=this.elements[i];
         var attr=obj['attr']=='x'? 'left':obj['attr']=='y'?'top':
                  obj['attr']=='w'?'width':obj['attr']=='h'?'height'://x轴，y轴方向变化，宽度和高度变化
                  obj['attr'] == 'o' ? 'opacity' : 'left';
         var start=obj['start']!=undefined?obj['start']:attr=='opacity'?
                                parseFloat(getStyle(element,attr))*100 :parseInt(getStyle(element,attr));
         var t=obj['t']!=undefined?obj['t']:30;
         var step=obj['step']!=undefined?obj['step']:10;
         var alter=obj['alter'];
         var target=obj['target'];
         var speed=obj['speed']!=undefined?obj['speed']:6;
         var type=obj['type']==0? 'constant':obj['type']==1?'buffer':'buffer';
         var mul=obj['mul'];
         if (alter != undefined && target == undefined) {
            target = alter + start;
         } else if (alter == undefined && target == undefined&&mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
         }

        if(start>target) step=-step;
        if(attr=='opacity'){
            element.style.opacity = parseInt(start) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
        }else {
            element.style[attr] = start + 'px';
        }
        if(mul==undefined){
            mul={};
            mul[attr]=target;
        }
        clearInterval(element.timer);
        element.timer=setInterval(function(){
            var flag=true;
            for(var i in mul) {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                    (target - parseInt(getStyle(element, attr))) / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }
                if (attr == 'opacity') {
                    if (step == 0) {
                        setOpacity();
                    } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
                        setOpacity();
                    } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
                        setOpacity();
                    } else {
                        var temp = parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = (temp + step) / 100;
                        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
                    }
                    if(parseInt(target)!=parseInt(parseFloat(getStyle(element, attr))*100)) flag=false;
                } else {
                    if (step == 0) {
                        setTarget();
                    } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                        setTarget();
                    } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    if(parseInt(target)!=parseInt(getStyle(element, attr))) flag=false;
                }
            }
            if (flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) obj.fn();
            }
        },t);
        function setTarget() {
            element.style[attr] = target + 'px';
        }
        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
        }
    }
    return this;
}
//插件入口
Base.prototype.extend=function(name,fn){
    Base.prototype[name]=fn;
};