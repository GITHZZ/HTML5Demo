//function TestEntity(gs,width,height,angle) {
//        var entity = {
//            "points":[[-width, -height], [width, -height], [width, height], [-width, height]],
//            "poly":[],
//            "x":gs.random(0, gs.width),
//            "y":gs.height / 2,
//            "angle":angle/180*Math.PI,
//            "speed":0,
//            "color":'rgba(255, 255, 255, 1.0)',
//            "collisionPoly":function(){
//                return this.poly;
//            },
//            "draw":function(c){
//            	// draw our circle
//			    c.strokeStyle = this.color;
//			    gs.polygon(this.poly);
//            },
//            "update":function(c){               
//     		     this.x = (this.x + this.speed * Math.sin(this.angle) + gs.width) % gs.width;
//			     this.y = (this.y - this.speed * Math.cos(this.angle) + gs.height) % gs.height;
//                 for (n=0; n<this.points.length; n++) {
//				    this.poly[n] = [this.points[n][0] * Math.cos(this.angle) - this.points[n][1] * Math.sin(this.angle) + this.x, this.points[n][0] * Math.sin(this.angle) + this.points[n][1] * Math.cos(this.angle) + this.y];
//			     }
//			     this.color = 'rgba(255, 255, 255, 1.0)';
//            }
//        }
//        gs.addEntity(entity);
//}

function appStart(){
    var gs = new JSGameSoup(document.getElementById("canvas"),24);
    console.info("[JSGameSoup Info] : ScreenWidth:" + gs.width + " ScreenHeight:" + gs.height);
    //TestEntity(gs,20,20,45);
    var manager=SceneManager_Singleton.sharedManager(gs);
    gs.launch();    
}
