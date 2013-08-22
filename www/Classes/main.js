//表示目前的场景状态
var scene_state=0;

//产生box2d圆形
function createBall(radius,posX,posY,gs,physicPlugin){
	var r = radius;
    var c = gs.random(100, 200);

    //using canvas
    var ball={
        "r" : r,
        "c" : c,
        "fs" : 'rgba(' + parseInt(c) + ', ' + parseInt(c) + ', ' + parseInt(c) + ', 1.0)',
        "body" : physicPlugin.createBodyInCircle(r,posX,posY),
        "draw" : function(c) {
            c.fillStyle = this.fs;
            c.strokeStyle = 'rgba(0,0,0,1.0)';
            c.beginPath();
            c.arc(this.body.m_position.x, this.body.m_position.y, this.r, 0, Math.PI*2, true);
            c.closePath();
            c.fill();
            c.stroke();
     	},
    }

    gs.addEntity(ball);
    return ball;
}
//产生文本图片
function createLabel(gs){
    var s = new Sprite(["center", "center"], {"default": [["Resources/TapScreen.png", 3]]}, false, 1.0);
    var sprite={
        "draw":function(c){
             s.draw(c, [gs.width/2, gs.height * 0.25]);
        }
    };
    gs.addEntity(sprite);
}
//产生文字
function createRevoluteJointLabel(gs){
    var s = new Sprite(["center", "center"], {"default": [["Resources/RevoluteJoint.png", 3]]}, false, 1.0);
    var sprite={
        "draw":function(c){
             s.draw(c, [gs.width/2, gs.height * 0.25]);
        }
    };
    gs.addEntity(sprite);
}
//游戏触控事件
function World(gs,physicPlugin){
    this.priority=1;
    this.pointerDown = function() {
        createBall(gs.random(10, 30),
                   gs.pointerPosition[0],
                   gs.pointerPosition[1],
                   gs,
                   physicPlugin);
    } 
    this.pointerBox = function() {
        return [0, 0, gs.width, gs.height];
    }
}

function initScene(gs,physicPlugin){
    //游戏触控事件
    gs.addEntity(new World(gs,physicPlugin));
    
	//游戏循环
	gs.addEntity({
		"update" : function(gs)	{
            physicPlugin.update(gs);
        }
	});
    
    //根据目前状态初始化不同效果
    if(scene_state===0){
        //添加文字提示
        createLabel(gs);
        //产生球
        createBall(10,100,100,gs,physicPlugin);
    }else if(scene_state===1){
        //添加文字提示
        createRevoluteJointLabel(gs);
        var tempBall=createBall(10,200,200,gs,physicPlugin);
        //产生旋转关节
        physicPlugin.createRevoluteJoint(tempBall.body,gs.width/2,gs.height/2);
    }
}

function init(gs){
    //初始化物理插件
    var physicPlugin=new BasicPhysicsObj(gs.width, gs.height);
    //初始化场景
    initScene(gs,physicPlugin);
    
    //按钮事件
    $("#refresh").click(function(){
        //清除所有渲染对象
        gs.clearEntities();
        //清除所有的body
        physicPlugin.removeAllBodys();
        physicPlugin=new BasicPhysicsObj(gs.width, gs.height)
        //重新初始化场景
        initScene(gs,physicPlugin);
        physicPlugin.initWithEdge(gs.width, gs.height);
    });
    //按下表示下一个
    $("#next").click(function(){
        scene_state=scene_state+1;
        if(scene_state>1){
            scene_state=scene_state-1;
            return;
        }
        gs.clearEntities();
        //清除所有的body
        physicPlugin.removeAllBodys();
        physicPlugin=new BasicPhysicsObj(gs.width, gs.height)
        //重新初始化场景
        physicPlugin.initWithEdge(gs.width, gs.height);
        initScene(gs,physicPlugin);
    });
    //按下前一个
    $("#prep").click(function(){
        scene_state=scene_state-1;
        if(scene_state<0){
            scene_state=scene_state+1;
            return;
        }
        gs.clearEntities();
        //清除所有的body
        physicPlugin.removeAllBodys();
        physicPlugin=new BasicPhysicsObj(gs.width, gs.height)
        //重新初始化场景
        physicPlugin.initWithEdge(gs.width, gs.height);
        initScene(gs,physicPlugin);
    });
}

function appStart(){
    var gs = new JSGameSoup(document.getElementById("canvas"),24);
    console.info("[JSGameSoup Info] : ScreenWidth:" + gs.width + " ScreenHeight:" + gs.height);
    init(gs);
    gs.launch();    
}
