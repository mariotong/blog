/**
 * Created by Administrator on 2016/2/5.
 */
$().extend('serialize',function(){
    for(var i=0;i<this.elements.length;i++){
        var form=this.elements[i];
        var parts={};
        for(var i=0;i<form.elements.length;i++){
            var filed=form.elements[i];
            switch(filed.type){
                case undefined:
                case 'submit':
                case 'reset':
                case 'file':
                case 'button':
                case 'radio':
                case 'checkbox':
                    if(!filed.selected) break;
                case 'select-one':
                case 'select-multiple':
                    break;
                default:
                    parts[filed.name]=filed.value;
            }
        }
        return parts;
    }
    return this;
})