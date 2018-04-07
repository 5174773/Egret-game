class AudioManager {
    private static instance: AudioManager;
    public sound: egret.Sound;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new AudioManager();
        }
        return this.instance;
    }
    constructor() {

    }
    /**
     * 播放战斗音乐
     */
    playFightAudio() {

        // 背景音乐
        this.sound = RES.getRes("game_mp3");
        this.sound.play();

    }

    playStop() {

        this.sound.close()

    }


}