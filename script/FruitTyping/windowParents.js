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
        this.undo = new ButtonOnCanvas("/static/img/button/undo/undo.png");
        this.decision = new ButtonOnCanvas("/static/img/button/decision/decision.png");
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
        this.undo.drawImage(30, 25);
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
 * よく使う音源を定義するクラス
 */
class AudioUsedRegularly {
    static bgm = new AudioOnWeb("/static/audio/bgm.mp3", AudioOnWeb.bgm);
    static kettei = new AudioOnWeb("/static/audio/kettei.mp3", AudioOnWeb.se);
    static type = new AudioOnWeb("/static/audio/type.mp3", AudioOnWeb.se);

    /**
     * 決定の効果音を鳴らす
     */
    static playAudioKettei() {
        AudioUsedRegularly.kettei.playAudio();
    }

    /**
     * タイピング音を鳴らす
     */
    static playAudioCorrectType() {
        AudioUsedRegularly.type.playAudio();
    }

    /**
     * bgmを鳴らす
     */
    static playAudioBGM() {
        AudioUsedRegularly.bgm.playAudioLoop();
    }
}
