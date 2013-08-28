/*
    CREATE BY HZZ ON 2013.8.25
    
*/
var RevoluteJoint = AbstractScene.extend({
    init:function(gs,physicPlugin){
        this.super(gs,physicPlugin);
        //添加文字提示
        this.createRevoluteJointLabel(gs);
        //产生刚体和关节
        var tempRect=this.createRect(20,20,0,100,180,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(tempRect.body,
                                         tempRect.body.m_position.x,
                                         tempRect.body.m_position.y,1000000000.0);
        var tempRect2=this.createRect(20,20,0,200,150,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(tempRect2.body,
                                         tempRect2.body.m_position.x,
                                         tempRect2.body.m_position.y,0);
        var ball=this.createBall(10,350,120,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(ball.body,350,70,0);
        this.createLinePointToBody(350,70,ball.body,gs); 
    },
    createRevoluteJointLabel:function(gs){
        var s = new Sprite(["center", "center"], {"default": [["Resources/RevoluteJoint.png", 3]]}, false, 1.0);
        var sprite={
            "draw":function(c){
                s.draw(c, [gs.width/2, gs.height * 0.25]);
            }
        };
        gs.addEntity(sprite);
    }
});