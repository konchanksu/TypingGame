
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
            if(!self.isDown && this.onClick(event.x, event.y)) {
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
            event => {
                if(self.isHover != self.onClick(event.x, event.y)) {
                    self.isHover = !self.isHover;
                    self.drawImage();
                }
            }
        ])
        this.addEvent(this.eventListeners.slice(-1)[0]);
    }

    /**
     * マウスが上がった時のイベントを追加する
     */
    addEventUp() {
        let self = this;
        this.eventListeners.push([
            "mouseup",
            event => {
                if(self.isDown) {
                    self.isDown = !self.isDown;
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

    /**
     * ボタンが表示されたタイミングで行う操作
     * @param {*} startW 左上のx座標
     * @param {*} startH 左上のy座標
     */
    doFirstDrawImage(startW, startH) {
        this.addEventHover();
        this.addEventDown();
        this.addEventUp();
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
        } else {
            this.doFirstDrawImage(this.startW, this.startH);
        }
    }
}
