
/**
 * 游戏进行的主界面
 */
class MainView extends egret.DisplayObjectContainer {
    //积分
    public totalIntegral: number = 0;
    public totalIntegralText: egret.TextField;

    private myPlane: MyPlane;  //玩家飞机
    public BulletList: PlaneBullet[] = []
    public objcBullet: ObjPool<PlaneBullet>; //子弹缓存池

    public EnemyList: EnemyPlane[] = [];
    private EnemyNum: number = 6;
    public objEnemy: ObjPool<EnemyPlane>;


    private myBullet: PlaneBullet;
    constructor() {
        super()

        //创建池子
        this.objcBullet = new ObjPool<PlaneBullet>();
        this.objEnemy = new ObjPool<EnemyPlane>();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.myPlaneView, this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this); // 帧事件
        
    }

    myPlaneView() {

        //积分
        this.totalIntegralText = new egret.TextField();
        this.totalIntegralText.text = "积分:" + this.totalIntegral;
        this.totalIntegralText.x = 10;
        this.totalIntegralText.y = 10;
        this.addChild(this.totalIntegralText);

        //背景
        this.initBG()
        //玩家飞机
        this.MyPlane();
        //敌机
        this.enemyPlaneImage();

    }
    initBG() {   //背景
        let bggun = new BgMap();
        this.addChildAt(bggun, 0);
        bggun.start()
    }


    MyPlane() {   //玩家飞机

        this.myPlane = new MyPlane();
        this.addChild(this.myPlane);
        //触摸事件
        this.myPlane.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.planeMobile, this)
        this.myPlane.touchEnabled = true;
        //飞机子弹
        var timer: egret.Timer = new egret.Timer(300, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerInitPlaneBullet, this);
        timer.start();
    }
    //飞机移动
    planeMobile(event: egret.TouchEvent) {
        this.myPlane.x = event.stageX - this.myPlane.width / 2;
        this.myPlane.y = event.stageY - this.myPlane.height / 2;
    }

    enemyPlaneImage() {  //敌机


        var timerEnemy: egret.Timer = new egret.Timer(1000, 0);
        timerEnemy.addEventListener(egret.TimerEvent.TIMER, this.timerInitEnemy, this);
        timerEnemy.start();
    }
    timerInitEnemy() {

        if (this.EnemyList.length < this.EnemyNum) {
            let enemy = new EnemyPlane()
            enemy.x = Math.ceil(Math.random() * this.stage.stageWidth)
            enemy.init(this.stage);
            this.addChild(enemy)
            this.EnemyList.push(enemy)
        }

    }





    /**帧事件 */
    onEnterFrame() {
        let gyg: MainView = this
        //敌机
        gyg.EnemyList.forEach(function (enemy) {
            enemy.y += enemy.speed
            if (Math.random() > 0.99) {
                enemy.flyLeft = !enemy.flyLeft;
            }
            if (enemy.x <= 0) {   //碰到墙面 反向走
                enemy.flyLeft = false
            }
            if (enemy.x >= gyg.stage.stageWidth - enemy.width) { //碰到墙面 反向走
                enemy.flyLeft = true;
            }
            if (enemy.flyLeft) {  //运动位置 
                enemy.x -= Math.ceil(Math.random() * 3);
            } else {
                enemy.x += Math.ceil(Math.random() * 3);
            }
            if (enemy.y > gyg.stage.stageHeight) {
                if (enemy.parent != null) {
                    gyg.objEnemy.Free(enemy);
                    gyg.EnemyList.splice(gyg.EnemyList.indexOf(enemy), 1);
                    gyg.removeChild(enemy);
                }
            }
        })
        //子弹
        gyg.BulletList.forEach(function (bullet) {
            bullet.y -= 16
            // bullet.x += 6 * (Math.sin(bullet.y / 100))

        })


        gyg.gameHitTest();

    }
    //碰撞
    private gameHitTest(): void {
        let gyg: MainView = this
        gyg.EnemyList.forEach(function (enemy) {

            gyg.BulletList.forEach(function (bullet) {
                if (enemy.HP != 0 && enemy.hitTestPoint(bullet.x, bullet.y) == true) {
                    enemy.EnemyExplosion(enemy, gyg, bullet)
                    gyg.totalIntegral += 100;
                    if (bullet.parent != null) {
                        enemy.HP--
                        gyg.removeChild(bullet);
                    }

                }

            })
        })

        gyg.totalIntegralText.text = "积分:" + gyg.totalIntegral;


    }






    //时间控制创建 子弹
    public timerInitPlaneBullet() {
        const objc: boolean = this.objcBullet.hasObjcet();
        const bullet = this.objcBullet.AllcoObj(PlaneBullet);
        bullet.initView(1)
        bullet.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10
        bullet.y = this.myPlane.y - 65;
        if (objc == false) {
            this.addChild(bullet);
            this.BulletList.push(bullet);
        }
    }
}

    //    public timerInitPlaneBullet() {
    //     const objc: boolean = this.objcBullet.hasObjcet();
    //     const bullet = this.objcBullet.AllcoObj(PlaneBullet);
    //     bullet.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10
    //     bullet.y = this.myPlane.y - 65;
    //       if (objc == false) {
    //         this.addChild(bullet);
    //         this.BulletList.push(bullet);
    //     }

    // }


    //  //时间控制创建 子弹
    // public timerInitPlaneBullet() {
    //     const objc: boolean = this.objcBullet.hasObjcet();
    //     const bullet = this.objcBullet.AllcoObj(PlaneBullet);
    //     bullet.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10 + 100
    //     bullet.y = this.myPlane.y - 65;
    //     bullet.isAlive = true;
    //     if (objc == false) {
    //         this.addChild(bullet);
    //         this.BulletList.push(bullet);
    //     }

    //     const objc2: boolean = this.objcBullet.hasObjcet();
    //     const bullet2 = this.objcBullet.AllcoObj(PlaneBullet);
    //     bullet2.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10 - 100
    //     bullet2.y = this.myPlane.y - 65;
    //     bullet2.isAlive = false;
    //     if (objc2 == false) {
    //         this.addChild(bullet2);
    //         this.BulletList.push(bullet2);
    //     }
    // }

    //  gyg.BulletList.forEach(function (bullet) {
    //         if (bullet.isAlive == true) {
    //             bullet.y -= 16
    //             bullet.x += 6 * (Math.sin(bullet.y / 100))

    //         }
    //         if (bullet.isAlive == false) {
    //             bullet.y -= 16
    //             bullet.x -= 6 * (Math.sin(bullet.y / 100))

    //         }

    //     })





