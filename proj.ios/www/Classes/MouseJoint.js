/*
    CREATE BY HZZ ON 2013.8.28
    BOX2D 鼠标关节
*/

var MouseJoint = AbstractScene.extend({
    init:function(gs,physicPlugin){
        this.super(gs,physicPlugin);
        //初始化球
        //for(var i=0;i<10;i++){
        this.ball=this.createBall(gs.random(10,30),
                 gs.random(0,gs.width),
                 gs.random(0,gs.height/2),
                 gs,
                 physicPlugin); 
        //}
    },
    touchUpEvent:function(gs,physicPlugin,scene){
        physicPlugin.createMouseJoint(this.ball.body,
                                      gs.pointerPosition[0],
                                      gs.pointerPosition[1],
                                      1000);
    },
    touchDownEvent:function(gs,physicPlugin,scene){
    
    }
});