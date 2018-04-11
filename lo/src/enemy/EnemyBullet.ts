class EnemyBullet extends BaseObjcet {
    public speed: number = 10;
    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    }

    initView() {
        let bigBullet: egret.Bitmap = Lg.createBitmapByName("n3_png");
        bigBullet.scaleX = 0.5
        bigBullet.scaleY = 0.5
        this.addChild(bigBullet)
        //    bigBullet.x = this.bigBitmap.x + 84;
        //    bigBullet.y = this.bigBitmap.y + 80
    }

    move() {
        this.y += this.speed;
    }
}