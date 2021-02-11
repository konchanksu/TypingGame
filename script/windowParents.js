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
        this.undo = new ButtonOnCanvas("/static/img/undo.png", "/static/img/undo_hover.png");
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

/**
 * ボタンを管理するクラス
 */
class ButtonOnCanvas {
    /**
     * コンストラクタ
     * @param {*} hover_src
     * @param {*} src 座標
     */
    constructor(src, hover_src) {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this._image = new Image();
        this._image.src = src;

        this._imageHover = new Image();
        this._imageHover.src = hover_src;

        this.isAbleClick = false;
        this.hover = false;
        this.eventListeners = [];
    }

    addEventHover() {
        let self = this;
        this.eventListeners.push(
            function(event) {
                if(self.hover != self.onClick(event.x, event.y)) {
                    self.hover = !self.hover;
                    self.drawImage();
                }
            }
        )
        addEventListener('mousemove',
            this.eventListeners[0]
        );
    }

    /**
     * ボタンを消去する
     */
    buttonClear() {
        this.canvas.clearRect(this.startW, this.startH, this._image.width, this._image.height);
    }

    /**
     * 描画する
     * @param {Integer} startW 左上のx座標
     * @param {Integer} startH 左上のy座標
     */
    drawImage(startW, startH) {
        if(!this.isAbleClick) { this.addEventHover(); }
        if(startW != undefined && startH != undefined) {
            this.startW = startW;
            this.startH = startH;
            this.endW = this.startW + this._image.width;
            this.endH = this.startH + this._image.height;
        }

        if(!this.hover) { this.ctx.drawImage(this._image, this.startW, this.startH); }
        else { this.ctx.drawImage(this._imageHover, this.startW, this.startH); }

        this.isAbleClick = true;
    }

    /**
     * 幅
     */
    width() {
        return this._image.width;
    }

    /**
     * 高さ
     */
    height() {
        return this._image.height;
    }

    /**
     * イベントの座標をキャンバスの座標に変更
     * @param {*} x
     * @param {*} y
     * @return canvasでの座標
     */
    position(x, y) {
        x -= this.canvas.getBoundingClientRect().left;
        y -= this.canvas.getBoundingClientRect().top;
        return [x, y];
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     * @param {Boolean} ボタンが押されたかどうか
     */
    onClick(x, y) {
        [x, y] = this.position(x, y);
        if(this.startW <= x && x <= this.endW && this.startH <= y && y <= this.endH && this.isAbleClick) { return true; }
        return false;
    }

    /**
     * イベントを削除する
     */
    removeEventListener() {
        this.eventListeners.map(
            eventListener => removeEventListener('mousemove',
                eventListener
            )
        );
    }

    /**
     * booleanに設定する
     * @param {*} bool
     */
    setAbleClick(bool) {
        this.isAbleClick = bool;
        if(!this.isAbleClick) {
            this.removeEventListener();
        }
    }
}
