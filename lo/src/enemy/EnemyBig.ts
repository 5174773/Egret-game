/**
 *    大敌机
 * 
 */
class EnemyBig extends egret.Sprite {

    public bigBitmap: egret.Bitmap;

    public HP: number


    //
    public bigBool: boolean;
    constructor() {
        super()

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    }

    public initView() {
        this.bigBitmap = Lg.createBitmapByName("big_1_png")
        this.HP = 20
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
    public initMoviceClip(big:EnemyBig,gyg: MainView,bullet:PlaneBullet) {
        var data = RES.getRes("big_json");
        var txtr = RES.getRes("big_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("big"));
        this.addChild(mc1);
        mc1.scaleX = 1.7;
        mc1.scaleY = 1.7;
        mc1.gotoAndPlay("big", 1);
        mc1.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            if (big.parent != null) {
                // gyg.objEnemy.Free(enemy);
                gyg.bigList.splice(gyg.bigList.indexOf(big), 1);
                gyg.removeChild(big);
            }
        }, this);
    }
}