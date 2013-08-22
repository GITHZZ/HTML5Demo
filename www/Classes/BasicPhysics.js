/*
    Create By Hzz on 2013.8.21
    BasicPhySics.js 物理框架 box2d 插件类
    
    说明:本类中主要提供方便产生物理效果等方法 
    init方法主要是初始化AABB,最小坐标-200,200
    update方法主要结合了JSGameSoup的循环,如果不是JsGameSoup框架就要重写这个方法
    removeAllBody连边缘也会删除掉,所以removeAllBody之后记得要重写调用initWithEdge来
    重写初始化边框(会改善的)
*/

var BasicPhysicsObj = Class.extend({
    init:function(sizeWidth,sizeHeight){
       // box2d world
	   var worldAABB = new b2AABB();
	   worldAABB.minVertex.Set( -200, -200 );
	   worldAABB.maxVertex.Set( sizeWidth + 200, sizeHeight + 200 );
       this.world = new b2World( worldAABB, new b2Vec2( 0, 200 ), true );  
        //初始化边缘
       this.initWithEdge(sizeWidth,sizeHeight);
    },
    //更新
    update:function(gs){
        this.world.Step(1/gs.framerate, 1);
    },
    initWithEdge:function(sizeWidth,sizeHeight){
       // floor, ceiling, and walls
       this.createEdge(this.world,sizeWidth / 2, sizeHeight + 200, sizeWidth, 200);
       this.createEdge(this.world,sizeWidth / 2, - 200, sizeWidth, 200);
       this.createEdge(this.world,- 200, sizeHeight / 2, 200, sizeHeight);
       this.createEdge(this.world,sizeWidth + 200, sizeHeight / 2, 200, sizeHeight);
    },
    //产生边缘
    createEdge:function(world, x, y, width, height){
		var boxSd = new b2BoxDef();

		boxSd.extents.Set(width, height);

		var boxBd = new b2BodyDef();
	
		boxBd.AddShape(boxSd);
		boxBd.position.Set(x,y);

		return world.CreateBody(boxBd);
    },
    //产生圆形刚体
    createBodyInCircle:function(radius,posX,posY){
        console.debug(this);
        
        var b2Body = new b2BodyDef();

        var circle = new b2CircleDef();
        circle.radius = radius;
        circle.density = 1;
        circle.friction = 0.1;
        circle.restitution = 0.9;
    
        b2Body.AddShape(circle);
        b2Body.position.Set(posX,posY);
        return this.world.CreateBody(b2Body);
    },
    //产生方形刚体
    createBodyInRect:function(){
        
    },
    //删除所有刚体
    removeAllBodys:function(){
        //清除所有body
        var b =this.world.m_bodyList;
        while(b != null){
            var tempBody = b.m_next;
            this.world.DestroyBody(b);
            b = tempBody;
        }
    },
    removeAllJoint:function(){
        //清除所有关节
        var j=this.world.m_jointList;
        while(j != null){
            var tempJoint = j.m_next;
            this.world.DestroyJoint(j);
            j = tempJoint;
        }
    },
    //产生距离关节
    createRevoluteJoint:function(body,x,y){
        var jointDef=new b2RevoluteJointDef();
        jointDef.anchorPoint.Set(x,y);
        jointDef.body1=this.world.GetGroundBody();
        jointDef.body2=body;
        var jointBody=this.world.CreateJoint(jointDef);
        return jointBody;
    }
});