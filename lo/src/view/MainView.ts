
/**
 * 游戏进行的主界面
 */
class MainView extends egret.DisplayObjectContainer {
    //积分
    public totalIntegral: number = 0;
    public totalIntegralText: egret.TextField;

    
    private soundChannel: egret.SoundChannel;

    private myPlane: MyPlane;  //玩家飞机
    public BulletList: PlaneBullet[] = []
    public objcBullet: ObjPool<PlaneBullet>; //子弹缓存池

    public EnemyList: EnemyPlane[] = [];
    private EnemyNum: number = 6;
    public objEnemy: ObjPool<EnemyPlane>;

    public enemyBig: EnemyBig;
    public big: egret.Timer
    public bigList: EnemyBig[] = [];
    public bigNum: number = 2
    public bigBullet: EnemyBullet;
    public bigBulletLits: EnemyBullet[] = []

    public flyLeft: boolean = true;

    private bulletGo1: egret.Bitmap
    private bulletGoList: Array<any> = []
    private myBullet: PlaneBullet;

    public timer: egret.Timer
    public timer1: egret.Timer
    public timerEnemy: egret.Timer
    private wupin: egret.Timer


    private uyguyguygu: startView
    constructor(t) {
        super()
        this.uyguyguygu = t;
        //创建池子
        this.objcBullet = new ObjPool<PlaneBullet>();
        this.objEnemy = new ObjPool<EnemyPlane>();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.myPlaneView, this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this); // 帧事件

    }

    myPlaneView() {
        //背景
        this.initBG()
        //玩家飞机
        this.MyPlane();
        //敌机
        this.enemyPlaneImage();
        //积分
        this.totalIntegralText = new egret.TextField();
        this.totalIntegralText.text = "积分:" + this.totalIntegral;
        this.totalIntegralText.x = 10;
        this.totalIntegralText.y = 10;
        this.addChild(this.totalIntegralText);
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
        this.timer = new egret.Timer(200, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerInitPlaneBullet, this);
        this.timer.start();
        //飞机子弹二
        this.timer1 = new egret.Timer(200, 0);
        this.timer1.addEventListener(egret.TimerEvent.TIMER, this.timerInitPlaneBullet1, this);
        // this.timer1.start();
        //big 敌机
        this.big = new egret.Timer(1000, 0);
        this.big.addEventListener(egret.TimerEvent.TIMER, this.timerInitBig, this);
        this.big.start();
        //物品
        this.wupin = new egret.Timer(8000, 0);
        this.wupin.addEventListener(egret.TimerEvent.TIMER, this.timerInitwuping, this);
        this.wupin.start();
    }
    //飞机移动
    planeMobile(event: egret.TouchEvent) {
        this.myPlane.x = event.stageX - this.myPlane.width / 2;
        this.myPlane.y = event.stageY - this.myPlane.height / 2;
    }

    enemyPlaneImage() {  //敌机
        this.timerEnemy = new egret.Timer(1000, 0);
        this.timerEnemy.addEventListener(egret.TimerEvent.TIMER, this.timerInitEnemy, this);
        this.timerEnemy.start();
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
        if (gyg == null) {
            return;
        }
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
        //子弹形态二
        gyg.bulletGoList.forEach(function (bulletGo1) {
            bulletGo1.y += 1
            if (bulletGo1.x <= 0) {
                bulletGo1.flyLeft = false
            }
            if (bulletGo1.x >= gyg.stage.stageWidth - bulletGo1.width) {
                bulletGo1.flyLeft = true;
            }
            if (bulletGo1.flyLeft == true) {  //运动位置 
                bulletGo1.x -= 3;
            } else {
                bulletGo1.x += 3;
            }

            //碰撞 紫色
            if (gyg.myPlane.hitTestPoint(bulletGo1.x, bulletGo1.y)) {
                if (bulletGo1.parent != null) {
                    gyg.removeChild(bulletGo1);
                    gyg.pemgzhuang()

                }
            }

        })
        gyg.BulletList.forEach(function (bullet) {
            if (bullet.timerOne == true) {
                bullet.y -= 20
            }
            if (bullet.timerOne == false && bullet.isAlive == true) {
                bullet.y -= 16
                bullet.x += 6 * (Math.sin(bullet.y / 100))
            }
            if (bullet.timerOne == false && bullet.isAlive == false) {
                bullet.y -= 16
                bullet.x -= 6 * (Math.sin(bullet.y / 100))
            }
        })
        //big 敌机
        gyg.bigList.forEach(function (enemyBig) {
            enemyBig.y += 0.2
            if (enemyBig.x <= 0) {   //碰到墙面 反向走
                enemyBig.flyLeft = false
            }
            if (enemyBig.x >= gyg.stage.stageWidth - enemyBig.width) { //碰到墙面 反向走
                enemyBig.flyLeft = true;
            }
            if (enemyBig.flyLeft) {  //运动位置 
                enemyBig.x -= Math.ceil(Math.random() * 3);
            } else {
                enemyBig.x += Math.ceil(Math.random() * 3);
            }
            gyg.myPlanebaoza(enemyBig.x, enemyBig.y);
        })
        gyg.bigBulletLits.forEach(function (bigBullet) {
            bigBullet.y += 10
            if (gyg == null || gyg.stage == null) {
                return;
            }
            if (bigBullet.y >= gyg.stage.stageHeight) {
                if (bigBullet.parent != null) {
                    gyg.removeChild(bigBullet)
                }
            }
            gyg.myPlanebaoza(bigBullet.x, bigBullet.y);
        })
        gyg.gameHitTest();
    }
    //碰撞
    private gameHitTest(): void {
       
        let gyg: MainView = this
         if(gyg.totalIntegralText == null){
            return;
        }
        gyg.EnemyList.forEach(function (enemy) {
            gyg.BulletList.forEach(function (bullet) {
                gyg.myPlanebaoza(enemy.x, enemy.y);
                if (enemy.HP != 0 && enemy.hitTestPoint(bullet.x, bullet.y) == true) {

                    if (bullet.parent != null) {
                        enemy.HP--
                        gyg.removeChild(bullet);
                    }
                    if (enemy.HP == 0) {
                        var sound: egret.Sound = RES.getRes("explosion_mp3");
                        sound.play(0, 1);
                        enemy.EnemyExplosion(enemy, gyg, bullet)
                        gyg.totalIntegral += 100;
                    }
                }
                gyg.bigList.forEach(function (enemyBig) {
                    if (enemyBig.HP != 0 && enemyBig.hitTestPoint(bullet.x, bullet.y) == true) {
                        if (bullet.parent != null) {
                            enemyBig.HP--
                            gyg.removeChild(bullet);
                        }
                        if (enemyBig.HP == 0) {

                            var sound: egret.Sound = RES.getRes("bigexplosion_wav");
                            sound.play(0, 1);
                            enemyBig.initMoviceClip(enemyBig, gyg, bullet)
                        }
                    }

                })
            })
        })
        gyg.totalIntegralText.text = "积分:" + gyg.totalIntegral;
    }
    //时间控制创建 子弹
    public timerInitPlaneBullet() {
        const objc: boolean = this.objcBullet.hasObjcet();
        const bullet = this.objcBullet.AllcoObj(PlaneBullet);
        bullet.initView(1)
        bullet.timerOne = true
        bullet.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10
        bullet.y = this.myPlane.y - 65;
        if (objc == false) {
            this.addChild(bullet);
            this.BulletList.push(bullet);
        }
        var sound: egret.Sound = RES.getRes("shoot_mp3");
        sound.play(0, 1);
    }

    timerInitwuping() {
        if (this.bulletGoList.length <= 1) {
            this.bulletGo1 = new egret.Bitmap()
            this.bulletGo1 = Lg.createBitmapByName("bullet_goods1_png")
            this.bulletGo1.x = Math.random() * this.stage.stageWidth;
            this.bulletGo1.y = 0
            this.addChild(this.bulletGo1);
            this.bulletGoList.push(this.bulletGo1)
            if (Math.random() > 0.5) {
                this.flyLeft = true;
            } else {
                this.flyLeft = false;
            }
        }
    }
    //时间控制创建 子弹
    public timerInitPlaneBullet1() {
        const objc: boolean = this.objcBullet.hasObjcet();
        const bullet = this.objcBullet.AllcoObj(PlaneBullet);
        bullet.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10 + 100
        bullet.y = this.myPlane.y - 65;
        bullet.isAlive = true;
        bullet.timerOne = false
        bullet.initView(2)
        if (objc == false) {
            this.addChild(bullet);
            this.BulletList.push(bullet);
        }
        const objc2: boolean = this.objcBullet.hasObjcet();
        const bullet2 = this.objcBullet.AllcoObj(PlaneBullet);
        bullet2.x = (this.myPlane.x) + (this.myPlane.width / 2) - 10 - 100
        bullet2.y = this.myPlane.y - 65;
        bullet2.isAlive = false;
        bullet2.initView(2)
        bullet2.timerOne = false
        if (objc2 == false) {
            this.addChild(bullet2);
            this.BulletList.push(bullet2);
        }
    }
    timerInitBig() {

        while (this.bigList.length < this.bigNum) {
            this.enemyBig = new EnemyBig();
            this.addChildAt(this.enemyBig, 1)
            this.enemyBig.x = Math.random() * (this.stage.stageWidth - this.enemyBig.width);
            this.enemyBig.y = 0;
            this.bigList.push(this.enemyBig)

        }
        var bigEnemy: egret.Timer = new egret.Timer(3000, 2);
        bigEnemy.addEventListener(egret.TimerEvent.TIMER, this.initbigBullet, this);
        bigEnemy.start();

    }
    initbigBullet() {
        let gyg: MainView = this
        this.bigList.forEach(function (enemyBig) {
            const bigBullet = new EnemyBullet();
            bigBullet.x = enemyBig.x + 84;
            bigBullet.y = enemyBig.y + 84;
            gyg.addChild(bigBullet)
            gyg.bigBulletLits.push(bigBullet)
        })
    }

    myPlanebaoza(x, y) {

        if (this.myPlane.hitTestPoint(x, y) == true) {

              //背景关闭

            this.timer.stop() //停止 时间创建
            this.timer1.stop()
            this.big.stop()
            this.timerEnemy.stop()
            this.wupin.stop()
            this.removeChildren();

            this.myPlane.touchEnabled = false; //点击事件关闭

            // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this); 
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this)
            let sktop = new StopView(this.uyguyguygu)


            this.uyguyguygu.addChild(sktop)


            this.uyguyguygu.removeChild(this)


        }


    }


    pemgzhuang() {

        this.timer.stop();
        this.timer1.start();
        this.myPlane.initImage()


    }
}