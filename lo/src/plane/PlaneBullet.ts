//玩家子弹

class PlaneBullet extends BaseObjcet {
    public isAlive: boolean;        // 存活状态
    public timerOne: boolean
    private myBUllet;

    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initFil, this)

    }

    initView(name: number) {
        switch (name) {
            case 1:
                let myBUllet = Lg.createBitmapByName("blue_bullet_png")
                myBUllet.scaleX = 1.3
                myBUllet.scaleY = 1.3;
                this.addChild(myBUllet)
                break;
            case 2:
                this.myBUllet = Lg.createBitmapByName("my_bullet_purple_png")
                this.myBUllet.scaleX = 1.5;
                this.myBUllet.scaleY = 1.5;
                this.addChild(this.myBUllet)
                break;
        }

    }


    initFil() {

        this.type = 2;
        
        // this.myBUllet = Lg.createBitmapByName("blue_bullet_png")
        // this.addChild(this.myBUllet)

    }


}