/*
    示例程序开始入口.初始化JSGameSoup之后在进入场景管理者.
*/

function appStart(){
    var gs = new JSGameSoup(document.getElementById("canvas"),24);
    console.info("[JSGameSoup Info] : ScreenWidth:" + gs.width + " ScreenHeight:" + gs.height);
    //TestEntity(gs,20,20,45);
    var manager = SceneManager_Singleton.sharedManager(gs);
    gs.launch();    
}
