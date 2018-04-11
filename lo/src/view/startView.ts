class startView extends egret.Sprite {
    private main: Main;

    constructor(main) {
        super()
        this.main = main;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initStartView, this);
    }

    initStartView() {

        let sky = Lg.createBitmapByName("BG_jpg");
        this.addChildAt(sky, 0);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let startButton = new eui.Button();
        startButton.skinName = "startButtonSkin";
        startButton.x = (this.stage.stageWidth / 2) - (startButton.width / 2);
        startButton.y = this.stage.stageHeight / 3;
        this.addChild(startButton);
        startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        var data = RES.getRes("fly_json");
        var txtr = RES.getRes("fly_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("fly"));
        this.addChild(mc1);
        mc1.x = (this.stage.stageWidth / 2) - (startButton.width / 2);
        mc1.y = this.stage.stageHeight / 3.5;
        mc1.scaleX = 1.5
        mc1.scaleY = 1.5;
        mc1.gotoAndPlay("start", -1);

    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let bggun = new MainView(this.main);
        this.main.addChild(bggun);
        this.main.removeChild(this);
        var sound: egret.Sound = RES.getRes("get_goods_wav");
        sound.play(0, 1);

        AudioManager.getInstance().playFightAudio()
    }
}