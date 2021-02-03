/**
 * タイトルを表示するページ
 */
class TitlePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new TitleWindow();

        /**
         * 現在位置の変数
         */
        this.nowCursor = 0;
    }

    /**
     * タイトルウィンドウの表示
     */
    showTitleWindow() {
        this.window.showTitleWindow(this.nowCursor);
    }

    /**
     * キー入力が押された時の処理
     * @param　押下されたキー
     * @return {Integer} -1なら何も起きない、それ以外の数字なら数字に対応づけられたページに遷移
     */
    inputKeyDown(key) {
        if(key == "ArrowUp") {
            if(this.nowCursor == 0) this.nowCursor = 3;
            this.nowCursor = (this.nowCursor - 1) % 3;
            this.window.showTitleWindow(this.nowCursor);
        } else if(key == "ArrowDown") {
            this.nowCursor = (this.nowCursor + 1) % 3;
            this.window.showTitleWindow(this.nowCursor);
        } else if(key == "Enter") {
            return this.nowCursor;
        }
        return -1;  // 何も起きない
    }
}

/**
 * タイトルのウィンドウを表示するクラス
 */
class TitleWindow {
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

        /**
         * 画像の読み込みを行う
         */
        this.chara = new Image();
        this.chara.src = "/static/img/title.png";
        this.pekora = new Image();
        this.pekora.src = "/static/img/pekora.png";
        this.single = new Image();
        this.single.src = "/static/img/single_play.png";
    }

    /**
     * キャンバスを消去する
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * ウィンドウ全体を表示する
     * @param nowCursor 現在のカーソル位置
     */
    showTitleWindow(nowCursor) {
        this.canvasClear();
        this.showTitle();
        this.showButton();
        this.showCursor(nowCursor);
    }

    /**
     * ボタン部分を消去する
     */
    buttonClear() {
        let height = 350;
        this.ctx.clearRect(0, height, this.canvas.width, this.canvas.height-height);
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        this.ctx.drawImage(this.pekora, 0, 0);
        this.ctx.drawImage(this.chara, 10, 60);
    }

    /**
     * カーソルを表示する
     */
    showCursor(nowCursor) {
        let width = 210;
        let height = 50;
        this.ctx.strokeRect((this.windowWidth - width) / 2, 335 + 60*nowCursor, width, height);
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        let width = 200;
        this.ctx.drawImage(this.single, (this.windowWidth - width) / 2, 370);
        this.ctx.fillText("マルチプレイ", (this.windowWidth - width) / 2, 430);
        this.ctx.fillText("設定", (this.windowWidth - width) / 2, 490);
    }
}
