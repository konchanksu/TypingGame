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
        this.frame = Images.getImage("frame");
        this.background = Images.getImage("background");
        this.undo = new ButtonOnCanvas("undo");
        this.decision = new ButtonOnCanvas("decision");
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.undo.mouseDown(x, y);
        this.decision.mouseDown(x, y);
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.undo.mouseMove(x, y);
        this.decision.mouseMove(x, y);
    }

    /**
     * マウスが上がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseUp(x, y) {
        this.undo.mouseUp(x, y);
        this.decision.mouseUp(x, y);
    }

    /**
     * 外枠を表示する
     */
    showFrame() {
        this.ctx.drawImage(this.frame, 0, 0);
    }

    /**
     * 背景を表示する
     */
    showBackGround() {
        this.ctx.drawImage(this.background, 0, 0);
    }

    /**
     * アンドゥ機能を表示する
     */
    showUndo() {
        this.undo.drawImage(45, 40);
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
 * ページ移動の固定の変数の定義
 */
class MovePage {
    static BEHIND_PAGE = -1;
    static AHEAD_PAGE = 1;
    static CURRENT_PAGE = 0;
}

/**
 * よく使う音源を定義するクラス
 */
class AudioUsedRegularly {
    static BGM = new AudioOnWeb("/static/audio/bgm.mp3", AudioOnWeb.BGM);
    static KETTEI = new AudioOnWeb("/static/audio/kettei.mp3", AudioOnWeb.SE);
    static TYPING = new AudioOnWeb("/static/audio/type.mp3", AudioOnWeb.SE);
    static CANCEL = new AudioOnWeb("/static/audio/cancel.mp3", AudioOnWeb.SE)

    /**
     * 決定の効果音を鳴らす
     */
    static playAudioKettei() {
        AudioUsedRegularly.KETTEI.playAudio();
    }

    /**
     * タイピング音を鳴らす
     */
    static playAudioCorrectType() {
        AudioUsedRegularly.TYPING.playAudio();
    }

    /**
     * bgmを鳴らす
     */
    static playAudioBGM() {
        AudioUsedRegularly.BGM.playAudioLoop();
    }

    /**
     * キャンセル音を鳴らす
     */
    static playAudioCancel() {
        AudioUsedRegularly.CANCEL.playAudio();
    }
}
