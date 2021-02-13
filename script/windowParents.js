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
        this.gl = this.canvas.getContext("webgl");
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
        this.undo = new ButtonOnCanvas("/static/img/button/undo/undo.png");
        this.decision = new ButtonOnCanvas("/static/img/button/decision/decision.png");
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

    /**
     * アンドゥ機能を表示する
     */
    showUndo() {
        this.undo.drawImage(20, 20);
    }

    /**
     * 決定ボタンを表示する
     * @param {*} startW
     * @param {*} startH
     */
    showDecision(startW, startH) {
        this.decision.drawImage(startW, startH);
    }
}

/**
 * オーディオを定義するクラス
 */
class AudioOnWeb extends Audio {
    static se = 0;
    static bgm = 1;
    /**
     * コンストラクタ
     * @param src audioのソース
     */
    constructor(src, musicType) {
        super();
        super.src = src;
        this.musicType = musicType;
        this.isNowPlayAudio = undefined;
    }

    /**
     * オーディオを実行する
     */
    playAudio() {
        if (this.isNowPlayAudio !== undefined) {
            this.currentTime = 0.0;
        }
        this.changeAudioVolume();
        this.isNowPlayAudio = super.play();
    }

    /**
     * 音量を変更する
     */
    changeAudioVolume() {
        switch (this.musicType) {
            case AudioOnWeb.se:
                super.volume = AudioSetting.nowSEVolume;
                break;
            case AudioOnWeb.bgm:
                super.volume = AudioSetting.nowBGMVolume;
                break;
        }
    }
}
