/*
    抽象类,所有的具体场景都继承自这个类
*/

var AbstractScene = Class.extend({
    init:function(gs,physicPlugin){
        if(gs===null||physicPlugin===null){
            console.error("fail to init,gs or physicPlugin is null");
        }
    },
    createBall:function(radius,posX,posY,gs,physicPlugin){
        var r = radius;
        var c = gs.random(100, 200);

        //using canvas
        var ball = {
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
    }
});