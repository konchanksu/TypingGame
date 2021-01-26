/**
 * タイトルを表示するページ
 */
class TitlePage {
    /**
     * コンストラクタ
     */
    constructor() {
        /**
         * キャンバス関係の処理
         */
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 48;
        this.windowWidth = 700;
        this.widnowHeight = 550;
        this.ctx.font = this.fontSize.toString() + "px osaka";

        /**
         * 現在位置の変数
         */
        this.nowCursor = 0;
    }

    /**
     * タイトルウィンドウの表示
     */
    showTitleWindow() {
        this.canvasClear();
        this.showTitle();
        this.showButton();
        this.showCursor();
    }

    /**
     * キャンバスを消去する
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * ボタン部分を消去する
     */
    buttonClear() {
        let height = 300;
        this.ctx.clearRect(0, height, this.canvas.width, this.canvas.height-height);
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
            this.showCursor();
        } else if(key == "ArrowDown") {
            this.nowCursor = (this.nowCursor + 1) % 3;
            this.showCursor();
        } else if(key == "Enter") {
            return this.nowCursor;
        }
        return -1;  // 何も起きない
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        const chara = new Image();
        chara.src = "/static/img/title.png";
        chara.onload = () => {
            this.ctx.drawImage(chara, 0, 0);
        };
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        for(let i = 0; i < 3; i++) {
            let width = 200;
            let height = 40;
            this.ctx.fillRect((this.windowWidth - width) / 2, 340 + 60*i, width, height);
        }
    }

    /**
     * カーソルを表示する
     */
    showCursor() {
        this.buttonClear();
        this.showButton();
        let width = 210;
        let height = 50;
        this.ctx.strokeRect((this.windowWidth - width) / 2, 335 + 60*this.nowCursor, width, height);
    }
}
