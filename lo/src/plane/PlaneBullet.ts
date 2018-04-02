//玩家子弹

class PlaneBullet extends egret.Sprite {
    public isAlive: boolean;        // 存活状态

    public myBUllet: egret.Bitmap;

    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initFil, this)

    }

    initView(name: number) {
        switch (name) {
            case 1:
                this.myBUllet = Lg.createBitmapByName("blue_bullet_png")
                this.myBUllet.scaleX = 1.3
                this.myBUllet.scaleY = 1.3;
                this.addChild(this.myBUllet)
                break;
            case 2: this.myBUllet = Lg.createBitmapByName("my_bullet_purple_png")
                this.myBUllet.scaleX = 1.5
                this.myBUllet.scaleY = 1.5;
                this.addChild(this.myBUllet)
                break;
            case 3: this.myBUllet = Lg.createBitmapByName("my_bullet_red_png")
                this.myBUllet.scaleX = 1.5
                this.myBUllet.scaleY = 1.5;
                this.addChild(this.myBUllet)
                break;
        }

    }


    initFil() {
        // this.myBUllet = Lg.createBitmapByName("blue_bullet_png")
        // this.addChild(this.myBUllet)

    }


}