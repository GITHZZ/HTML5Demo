/*
    CREATE BY HZZ ON 2013.8.25
    
*/
var RevoluteJoint = Class.extend({
    init:function(gs,physicPlugin){
        //添加文字提示
        this.createRevoluteJointLabel(gs);
        var tempRect=this.createRect(20,20,0,100,180,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(tempRect.body,
                                         tempRect.body.m_position.x,
                                         tempRect.body.m_position.y,100);
        var tempRect2=this.createRect(20,20,0,200,150,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(tempRect2.body,
                                         tempRect2.body.m_position.x,
                                         tempRect2.body.m_position.y,0);
        var ball=this.createBall(10,350,120,gs,physicPlugin);
        physicPlugin.createRevoluteJoint(ball.body,350,70,0);
        this.createLinePointToBody(350,70,ball.body,gs); 
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
    createRect:function(width,height,angle,posX,posY,gs,physicPlugin) {
        var c = gs.random(100, 200);
    
        var entity = {
            "w":width,
            "h":height,
            "points":[[-width, -height], [width, -height], [width, height], [-width, height]],
            "poly":[],
            "x":posX,
            "y":posY,
            "angle":angle/180*Math.PI,
            "speed":0,
            "body":physicPlugin.createBodyInRect(width,height,posX,posY),
            "color":'rgba(' + parseInt(c) + ', ' + parseInt(c) + ', ' + parseInt(c) + ', 1.0)',
            "collisionPoly":function(){
                return this.poly;
            },
            "draw":function(c){
            	// draw our circle
			    c.strokeStyle = 'rgba(0, 0, 0, 1.0)';
                c.fillStyle = this.color;
			    gs.polygon(this.poly);
            },
            "update":function(c){ 
                 this.x=this.body.m_position.x;
                 this.y=this.body.m_position.y;  
                 this.angle=this.body.m_rotation;
                 for (n=0; n<this.points.length; n++) {
				    this.poly[n] = [this.points[n][0] * Math.cos(this.angle) - this.points[n][1] * Math.sin(this.angle) + this.x, 
                                    this.points[n][0] * Math.sin(this.angle) + this.points[n][1] * Math.cos(this.angle) + this.y];
			     }
            }
        }
        gs.addEntity(entity);
        return entity;
    },
    //划线
    createLinePointToBody:function(posX,posY,body,gs){
        var line = {
            "body":body,
            "x":posX,
            "y":posY,
            "draw":function(c){
                c.moveTo(this.x,this.y);
                c.lineTo(this.body.m_position.x,
                         this.body.m_position.y);
                c.stroke();
            }
        }
        gs.addEntity(line);
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