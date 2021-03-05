/**
 * ボタンを管理するクラス
 */
class ButtonOnCanvas {
    /**
     * コンストラクタ
     * @param {*} name
     */
    constructor(name) {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this._image = Images.getImage(name);
        this._imageHover = Images.getImage(name+"_hover");
        this._imageDown = Images.getImage(name+"_down");

        this.isAbleClick = false;
        this.isHover = false;
        this.isDown = false;
    }

    /**
     * 描画する
     * @param {Integer} startW 左上のx座標
     * @param {Integer} startH 左上のy座標
     */
    drawImage(startW, startH) {
        if(!this.isAbleClick) { this.doFirstDrawImage(startW, startH); }
        if(startW != undefined) { this.startW = startW; }
        if(startH != undefined) { this.startH = startH; }

        if(!this.isHover && !this.isDown) { this.ctx.drawImage(this._image, this.startW, this.startH); }
        else if(this.isDown) { this.ctx.drawImage(this._imageDown, this.startW, this.startH); }
        else { this.ctx.drawImage(this._imageHover, this.startW, this.startH); }
    }

    /**
     * マウスの押下を受け取った時の変数設定
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        if(this.onClick(x, y)) { this.isDown = true; }
        else { this.isDown = false; }
    }

    /**
     * マウスの動作を受け取った時の変数設定
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        if(this.onClick(x, y)) { this.isHover = true; }
        else { this.isHover = false; }
    }

    mouseUp(x, y) {
        this.isDown = false;
    }

    /**
     * ボタンが表示されたタイミングで行う操作
     * @param {*} startW 左上のx座標
     * @param {*} startH 左上のy座標
     */
    doFirstDrawImage(startW, startH) {
        this.startW = startW;
        this.startH = startH;
        this.endW = this.startW + this._image.width;
        this.endH = this.startH + this._image.height;
        this.isAbleClick = true;
    }

    /**
     * 幅
     */
    width() {
        if(!this.isHover && !this.isDown) { return this._image.width; }
        else if(this.isDown) { return this._imageDown.width; }
        return this._imageHover.width;
    }

    /**
     * 高さ
     */
    height() {
        if(!this.isHover && !this.isDown) { return this._image.height; }
        else if(this.isDown) { return this._imageDown.height; }
        return this._imageHover.height;
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
     * booleanに設定する
     * @param {*} bool
     */
    setAbleClick(bool) {
        this.isAbleClick = bool;
        if(!this.isAbleClick) {
            this.isDown = false;
            this.isHover = false;
        }
    }
}

/**
 * スライドボタンを定義するクラス
 */
class SlideButtonOnCanvas {
    /**
     * コンストラクタ
     * @param {*} minWidth
     * @param {*} maxWidth
     * @param {*} startH
     * @param {*} nowStatus 割合での現在ステータス
     */
    constructor(minWidth, maxWidth, startH, nowStatus) {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.nowStatus = nowStatus;

        this.nowPosition = parseInt(this.minWidth + (this.maxWidth-this.minWidth)*this.nowStatus);

        this.startH = startH;

        this.height = 10;
        this.rect = 15;

        this.isAbleClick = false;
        this.isDown = false;
    }

    /**
     * スライダーバーを表示する
     */
    showSlideButton() {
        if(!this.isAbleClick) { this.doFirstDrawImage(); }

        let minToNowWidth = this.nowPosition-this.minWidth;
        let maxToNowWidth = this.maxWidth-this.nowPosition;

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillRect(this.minWidth, this.startH, minToNowWidth, this.height);

        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(this.nowPosition, this.startH, maxToNowWidth, this.height);

        this.ctx.strokeStyle = "#333333";
        this.ctx.strokeRect(this.minWidth, this.startH, this.maxWidth-this.minWidth, this.height);

        let circle = new Path2D();
        circle.arc(this.nowPosition, this.startH+(this.height/2), this.rect, 0, 2 * Math.PI);

        this.ctx.fill(circle);
        this.ctx.stroke(circle);

        this.isAbleClick = true;
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        if(!this.isDown) return;
        [x, y] = this.position(x, y);
        if(this.minWidth + this.rect > x) x = this.minWidth + this.rect;
        if(this.maxWidth - this.rect < x) x = this.maxWidth - this.rect;
        this.nowPosition = x;
        this.nowStatus = (this.nowPosition - this.minWidth - this.rect) / (this.maxWidth - this.minWidth + this.rect);
    }

    /**
     * マウスをおろす処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        if(this.onClick(x, y)) { this.isDown = true; }
    }

    /**
     * マウスを上げる処理
     * @param {*} x
     * @param {*} y
     */
    mouseUp(x, y) {
        this.isDown = false;
    }

    /**
     * ボタンが表示されたタイミングで行う操作
     */
    doFirstDrawImage() {
        this.isDown = false;
    }

    /**
     * 高さ
     * @return 返却する
     */
    getStartH() {
        return this.startH;
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
     * 丸いボタンでクリックできているかどうか
     * @param x
     * @param y
     */
    onClick(x, y) {
        [x, y] = position(x, y);
        if((this.nowPosition - x) ** 2 + (this.startH+(this.height/2) - y) ** 2 <= this.rect ** 2) {
            return true;
        }
        return false;
    }

    /**
     * booleanに設定する
     * @param {*} bool
     */
    setAbleClick(bool) {
        this.isAbleClick = bool;
        this.doFirstDrawImage();
    }

    getNowPosition() {
        return this.nowPosition;
    }

    getNowStatus() {
        return this.nowStatus;
    }
}
