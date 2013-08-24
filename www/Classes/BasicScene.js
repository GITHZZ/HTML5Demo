
var BasicScene = Class.extend({
    init:function(gs,physicPlugin){
        //产生提示
        this.createLabel(gs);
        //产生圆球
        this.createBall(10,100,100,gs,physicPlugin)
    },
    createBall:function(radius,posX,posY,gs,physicPlugin){
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
            }
          }
          
          gs.addEntity(ball);     
          return ball;      
     },
     createLabel:function(gs){
        var s = new Sprite(["center", "center"], {"default": [["Resources/TapScreen.png", 3]]}, false, 1.0);
        var sprite={
            "draw":function(c){
                s.draw(c, [gs.width/2, gs.height * 0.25]);
            }
        };
        gs.addEntity(sprite); 
    }                    
});