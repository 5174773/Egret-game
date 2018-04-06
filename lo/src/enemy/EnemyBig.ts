/**
 *    大敌机
 * 
 */
class EnemyBig extends egret.Sprite {

    public bigBitmap: egret.Bitmap;

    public HP: number 


    //
    public bigBool :boolean ;
    constructor() {
        super()

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    }
    
    public initView() {
        this.bigBitmap = Lg.createBitmapByName("big_1_png")
        this.HP = 5
        this.bigBitmap.scaleX = 1.7;
        this.bigBitmap.scaleY = 1.7;
        this.addChild(this.bigBitmap);
    }
    //  图片二
    public initView2() {
        this.bigBitmap = Lg.createBitmapByName("big_2_png")
        this.bigBitmap.scaleX = 1.7;
        this.bigBitmap.scaleY = 1.7;
        this.addChild(this.bigBitmap);
    }

 
    



    //飞机爆炸动画
    public initMoviceClip() {
        var data = RES.getRes("big_json");
        var txtr = RES.getRes("big_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("big"));
        this.addChild(mc1);
        mc1.scaleX = 1.7;
        mc1.scaleY = 1.7;
        mc1.gotoAndPlay("big", 1);
    }
}