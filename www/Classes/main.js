function appStart(){
    var gs = new JSGameSoup(document.getElementById("canvas"),24);
    console.info("[JSGameSoup Info] : ScreenWidth:" + gs.width + " ScreenHeight:" + gs.height);
    var manager=SceneManager_Singleton.sharedManager(gs);
    gs.launch();    
}
