/**
 * ウィンドウ定義の親クラス
 */
class WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        /**
         * キャンバス関係の情報
         */
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 24;
        this.windowWidth = this.canvas.width;
        this.widnowHeight = this.canvas.height;
        this.ctx.font = this.fontSize.toString() + "px osaka";

        this.imageLoad();
    }

    /**
     * キャンバスを消去する
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.windowWidth, this.widnowHeight);
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        this.frame = new Image();
        this.frame.src = "/static/img/frame.png";
        this.kettei = new AudioOnWeb("/static/audio/kettei.mp3", AudioOnWeb.se);
        this.type = new AudioOnWeb("/static/audio/type.mp3", AudioOnWeb.se);
    }

    /**
     * 決定の効果音を鳴らす
     */
    playAudioKettei() {
        this.kettei.playAudio();
    }

    /**
     * タイピング音を鳴らす
     */
    playAudioCorrectType() {
        this.type.playAudio();
    }

    /**
     * 外枠を表示する
     */
    showFrame() {
        this.ctx.drawImage(this.frame, 0, 0);
    }
}

/**
 * オーディオを定義するクラス
 */
class AudioOnWeb extends Audio {
    static se = 0;
    /**
     * コンストラクタ
     * @param src audioのソース
     */
    constructor(src, musicType) {
        super();
        super.src = src;
        this.musicType = musicType;
    }

    /**
     * オーディオを実行する
     */
    playAudio() {
        super.pause();
        super.currentTime = 0;
        if(this.musicType == AudioOnWeb.se) {
            super.volume = AudioSetting.nowSEVolume;
        }
        super.play();
    }
}
