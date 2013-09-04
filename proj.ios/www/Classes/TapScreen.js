
var TapScreen = AbstractScene.extend({
    init:function(gs,physicPlugin){
        this.super(gs,physicPlugin);
        //产生提示
        this.createLabel(gs);
        //产生圆球
        this.createRect(15,15,0,200,100,gs,physicPlugin);
    },
    createLabel:function(gs){
        var s = new Sprite(["center", "center"], {"default": [["Resources/TapScreen.png", 3]]}, false, 1.0);
        var sprite={
            "draw":function(c){
                s.draw(c, [gs.width/2, gs.height * 0.25]);
            }
        };
        gs.addEntity(sprite); 
    },
    touchUpEvent:function(gs,physicPlugin,scene){
       scene.createBall(gs.random(10,30),
                        gs.pointerPosition[0],
                        gs.pointerPosition[1],
                        gs,
                        physicPlugin); 
    },
    touchDownEvent:function(gs,physicPlugin,scene){}
});