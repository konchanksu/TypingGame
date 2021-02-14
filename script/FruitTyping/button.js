/**
 * ボタンを管理するクラス
 */
class ButtonOnCanvas {
    /**
     * コンストラクタ
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
    constructor(minWidth, maxWidth, startH, nowStatus, eventName, eventF) {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.nowStatus = nowStatus;

        this.nowPosition = parseInt(this.minWidth + (this.maxWidth-this.minWidth)*this.nowStatus);

        this.startH = startH;

        this.height = 10;
        this.rect = 10;

        this.isAbleClick = false;
        this.isDown = false;

        this.eventName = eventName;
        this.eventF = eventF;

        let self = this;
        this.mouseMove = ["mousemove", (event) => {
            let x;
            let y;
            [x, y] = self.position(event.x, event.y);
            if(self.minWidth > x) x = self.minWidth;
            if(self.maxWidth < x) x = self.maxWidth;
            self.nowPosition = x;
            self.nowStatus = (self.nowPosition - self.minWidth) / (self.maxWidth - self.minWidth);
            self.showSlideButton();
            dispatchEvent(new CustomEvent(self.eventName, {detail: self.nowStatus}));
        }];

        this.eventListeners = [];
    }

    /**
     * ボタンを消去する
     */
    buttonClear() {
        this.ctx.clearRect(this.minWidth-this.rect-1, this.startH-5-1, this.maxWidth-this.minWidth+this.rect*2+2, this.rect*2+2);
    }

    /**
     * スライダーバーを表示する
     */
    showSlideButton() {
        if(!this.isAbleClick) { this.doFirstDrawImage(); }

        let minToNowWidth = this.nowPosition-this.minWidth;
        let maxToNowWidth = this.maxWidth-this.nowPosition;

        this.buttonClear();

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
     * イベントを消去する
     */
    removeEvent(eventListener) {
        removeEventListener(
            eventListener[0],
            eventListener[1]
        )
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
                self.addEvent(self.mouseMove);
            }
        }])
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
                    self.removeEvent(self.mouseMove);
                }
            }
        ])
        this.addEvent(this.eventListeners.slice(-1)[0]);
    }

    /**
     * 自作イベントを追加する
     */
    addEventSelf() {
        let self = this;
        this.eventListeners.push([
            self.eventName,
            self.eventF
        ])
        this.addEvent(this.eventListeners.slice(-1)[0]);
    }

    /**
     * ボタンが表示されたタイミングで行う操作
     */
    doFirstDrawImage() {
        this.addEventDown();
        this.addEventUp();
        this.addEventSelf();
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
     * イベントを削除する
     */
    removeEventListener() {
        this.eventListeners.map(
            eventListener => removeEventListener(
                eventListener[0],
                eventListener[1]
            )
        );

        removeEventListener(
            this.mouseMove[0],
            this.mouseMove[1]
        )
    }

    /**
     * 丸いボタンでクリックできているかどうか
     * @param x
     * @param y
     */
    onClick(x, y) {
        [x, y] = this.position(x, y);
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
        if(!this.isAbleClick) {
            this.removeEventListener();
            this.isDown = false;
        } else {
            this.doFirstDrawImage();
        }
    }

    getNowPosition() {
        return this.nowPosition;
    }
}