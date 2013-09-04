/*
    CreateBy HZZ ON 2013.8.24
    SceneManager 场景管理者 用于管理改程序的场景 变换等工作
    
    产生方法:SceneManager_Singleton.sharedManager(gs); 必须单例 并且传入
    JSGameSoup的滑板 JSGameSoup类
    支持触摸事件
    具体还有一个就是转换场景的方法:replaceScene 参数是一个是gs 还有一个是转换到那个场景的代号
*/

//产生单例
var SceneManager_Singleton=(function(){
    var _sharedManager=null;
    return {
        sharedManager:function(gs){
            if(!_sharedManager){
                _sharedManager = new SceneManager(gs);
            }
            return _sharedManager;
        }
    }
})();

var SceneManager = Class.extend({
    init:function(gs){
        //初始化物理插件
        var physicPlugin = new BasicPhysicsObj(gs.width, gs.height);
        //标示
        var scene_state = 0;
        //初始化场景
        this.initScene(gs,physicPlugin,scene_state);
        //绑定层
        var secne = this;
        //按钮事件
        $("#refresh").click(function(){
            //清除所有渲染对象
            gs.clearEntities();
            secne.replaceScene(gs,physicPlugin,scene_state);
        });
        //按下表示下一个
        $("#next").click(function(){
            scene_state=scene_state+1;
            if(scene_state>2){
                scene_state=scene_state-1;
                return;
            }
            secne.replaceScene(gs,physicPlugin,scene_state);
        });
        //按下前一个
        $("#prep").click(function(){
            scene_state = scene_state-1;
            if(scene_state<0){
                scene_state = scene_state+1;
                return;
            }
            secne.replaceScene(gs,physicPlugin,scene_state);
        });
    },
    initScene:function(gs,physicPlugin,scene_state){
         //游戏循环
	     gs.addEntity({
		     "update" : function(gs)	{
                 physicPlugin.update(gs);
            }
	     });
         //初始化场景
         var scene;
         if(scene_state === 0){
            scene=new TapScreen(gs,physicPlugin);
         }else if(scene_state === 1){
            scene=new RevoluteJoint(gs,physicPlugin);
         }else if(scene_state === 2){
            scene=new MouseJoint(gs,physicPlugin);
         }
         //游戏触控事件
         gs.addEntity(this.touchEvent(gs,physicPlugin,scene));
    },
    touchEvent:function(gs,physicPlugin,scene){
        var touchEvent = {
            "priority":1,
            "pointerDown":function(){
                scene.touchUpEvent(gs,physicPlugin,scene);
            },
            "pointerMove":function(){
                scene.touchMoveEvent(gs,physicPlugin,scene);
            },
            "pointerUp":function(){
                scene.touchDownEvent(gs,physicPlugin,scene);
            },
            "pointerBox":function(){
                return [0, 0, gs.width, gs.height];
            }
        }
    
        return touchEvent;
    },
    //场景替换
    replaceScene:function(gs,physicPlugin,scene_state){
        //JSGameSoup清除对象
        gs.clearEntities();
        //清除所有的body
        physicPlugin.removeAllBodys();
        physicPlugin = new BasicPhysicsObj(gs.width, gs.height)
        //重新初始化场景
        physicPlugin.initWithEdge(gs.width, gs.height);
        //初始化场景
        this.initScene(gs,physicPlugin,scene_state);
    }
});