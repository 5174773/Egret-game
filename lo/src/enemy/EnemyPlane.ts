class EnemyPlane extends BaseObjcet{
    public speed: number = 3;
    public flyLeft: boolean = true;   //是否向左飞
    public myEnemy: egret.Bitmap;
    public score: number;  //分数
    public HP: number    //当前血量
    public bloodVolume: number  // 总血量

    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    }


    initView() {
        this.myEnemy = Lg.createBitmapByName("small_enemy_png")
        this.HP = 2
        this.myEnemy.scaleX = 1.7;
        this.myEnemy.scaleY = 1.7;
        this.addChild(this.myEnemy)
    }



    public init(stage) {
        this.HP = 1;
        this.y = 0;
        //随机数
        this.x = Math.ceil(Math.random() * stage.stageWidth);
        if (Math.random() > 0.5) {
            this.flyLeft = true;
        } else {
            this.flyLeft = false;
        }
    }
    //飞机爆炸
    public EnemyExplosion(enemy:EnemyPlane,gyg: MainView,bullet:PlaneBullet) {
        this.removeChildren();
        var data = RES.getRes("small_json");
        var txtr = RES.getRes("small_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("small"));
        this.addChild(mc1);
        mc1.scaleX = 1.7;
        mc1.scaleY = 1.7;
        mc1.gotoAndPlay("baoza", 0);
        mc1.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            if (enemy.parent != null) {
                gyg.objEnemy.Free(enemy);
                gyg.EnemyList.splice(gyg.EnemyList.indexOf(enemy), 1);
                gyg.removeChild(enemy);
            }
        }, this);

    }

}