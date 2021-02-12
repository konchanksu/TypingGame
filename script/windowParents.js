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
        }
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
    constructor(src) {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this._image = new Image();
        this._image.src = src;

        this._imageHover = new Image();
        this._imageHover.src = src.slice(0, -4) + "_hover" + src.slice(-4);

        this._imageDown = new Image();
        this._imageDown.src = src.slice(0, -4) + "_down" + src.slice(-4);

        this.isAbleClick = false;
        this.isHover = false;
        this.isDown = false;
        this.eventListeners = [];
    }

    /**
     * 直前にリストに追加したイベントを登録する
     */
    addEvent(eventListener) {
        addEventListener(
            eventListener[0],
            eventListener[1]
        );
    }

    /**
     * マウスダウンイベントを追加する
     */
    addEventDown() {
        let self = this;
        this.eventListeners.push([
            "mousedown",
            event => {
            if(self.isDown != self.onClick(event.x, event.y)) {
                self.isDown = !self.isDown;
                self.drawImage();
            }
        }])
        this.addEvent(this.eventListeners.slice(-1)[0]);
    }

    /**
     * ホバーイベントを追加する
     */
    addEventHover() {
        let self = this;
        this.eventListeners.push([
            "mousemove",
            function(event) {
                if(self.isHover != self.onClick(event.x, event.y)) {
                    self.isHover = !self.isHover;
                    self.drawImage();
                }
            }
        ])
        this.addEvent(this.eventListeners.slice(-1)[0]);
    }

    /**
     * ボタンを消去する
     */
    buttonClear() {
        this.ctx.clearRect(this.startW, this.startH, this._image.width, this._image.height);
    }

    /**
     * 描画する
     * @param {Integer} startW 左上のx座標
     * @param {Integer} startH 左上のy座標
     */
    drawImage(startW, startH) {
        if(!this.isAbleClick) { this.doFirstDrawImage(startW, startH); }

        this.buttonClear();
        if(!this.isHover && !this.isDown) { this.ctx.drawImage(this._image, this.startW, this.startH); }
        else if(this.isDown) { this.ctx.drawImage(this._imageDown, this.startW, this.startH); }
        else { this.ctx.drawImage(this._imageHover, this.startW, this.startH); }

        this.isAbleClick = true;
    }

    doFirstDrawImage(startW, startH) {
        this.addEventHover();
        this.addEventDown();
        this.startW = startW;
        this.startH = startH;
        this.endW = this.startW + this._image.width;
        this.endH = this.startH + this._image.height;
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
            eventListener => removeEventListener(
                eventListener[0],
                eventListener[1]
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
            this.isHover = false;
            this.isDown = false;
        }
    }
}
