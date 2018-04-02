/**
 * 玩家飞机
 */

class MyPlane extends egret.Sprite {

    //飞机
    public myPlaneBitmap: egret.Bitmap;

    constructor() {

        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this) //添加精灵
        
    }
    //初始化
    public initView() {

        this.myPlaneBitmap = Lg.createBitmapByName("blue_plane_png");
        this.myPlaneBitmap.scaleX = 1.7;
        this.myPlaneBitmap.scaleY = 1.7;
        this.x = (this.stage.stageWidth / 2) - (this.myPlaneBitmap.width / 2);
        this.y = this.stage.height / 3;
        this.addChild(this.myPlaneBitmap);

    }
    //飞机爆炸
    public PlaneExplosion() {

        var data = RES.getRes("myplaneexplosion_json");
        var txtr = RES.getRes("myplaneexplosion_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("explosion"));
        this.addChild(mc1);
        mc1.scaleX = 1.7;
        mc1.scaleY = 1.7;
        mc1.gotoAndPlay("exp", 1);
    }
    
}



