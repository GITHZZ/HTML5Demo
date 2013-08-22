/*
    Create By HZZ on 2013.7.23
    Class.js : 本APP中最底层的一个文件,用于创建一个类
    
    javascript中的类型基类,用于创建对象Class对象
    init()方法为初始化方法.创建类的时候会自动调用init的方法
    _super属性可以调用父类的init方法.
    子类需要调用父类的方法直接this.method(父类中想调用的方法名字)
*/

(function(){
    var initializing_ = false;//当前是否处于创建类的阶段
    Class = function(){};
    Class.extend=function(prop){
        // 如果调用当前函数的对象（这里是函数）不是Class，则是父类
        var baseClass = null;
        if(this!=Class){
            baseClass=this;
        }
        //本次调用所创建的类
        function Template(){
            if(!initializing_){
                //是否存在父类对象
                //如果存在就提供一个base属性指向父类的方法
                if(baseClass){
                    this.superprototype=baseClass.prototype;
                }
                this.init.apply(this,arguments);
            }
        }
        //如果此类是从其他类扩展
        if(baseClass){
            initializing_=true;
            Template.prototype=new baseClass();
            Template.prototype.constructor=Template;//解决指向性错误
            initializing_=false;
        }
        //新创建的类自动添加extend函数
        Template.extend=arguments.callee;
        //覆盖父类的同名函数
        for(var name in prop){
            if(prop.hasOwnProperty(name)){
                //如果此类是继承自父类baseClass而且和父类存在同名函数[name]
                if(baseClass&&
                   typeof(prop[name]=="function")&&
                   typeof(Template.prototype[name]=="function")&&
                   /\bsuper\b/.test(prop[name])){
                    Template.prototype[name]=(function(name,fn){
                        return function(){
                            this.super=baseClass.prototype[name];
                            return fn.apply(this,arguments);
                        };
                    })(name,prop[name]); 
               }else{
                    Template.prototype[name]=prop[name];
               }
            }
        }
        return Template;
    };
})();
