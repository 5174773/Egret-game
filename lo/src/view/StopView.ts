class StopView extends egret.Sprite {

    private view:startView

    constructor(view) {
        super()
       
       this.view = view
        

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
        startButton.skinName = "btnzailaiyici";
        startButton.x = (this.stage.stageWidth / 2) - (startButton.width / 2);
        startButton.y = this.stage.stageHeight / 3;
        this.addChild(startButton);
        startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        

        let bggun = new MainView(this.view);

        this.view.addChild(bggun);
    
        var sound: egret.Sound = RES.getRes("get_goods_wav");
        sound.play(0,1);
    }
}