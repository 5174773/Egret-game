
/**
 * 游戏进行的主界面
 */
class MainView extends egret.Sprite{

       constructor(){
           super()
           //背景
           this.initBG()
       }
       initBG(){
        let bggun = new BgMap();
        this.addChild(bggun);
        bggun.start()
       }


}