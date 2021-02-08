/**
 * 合言葉を入力するページ
 */
class AikotobaPage{
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

        this.inputKeyBoard = new InputKeyBoard(6);
        this.aikotobaWindow = new AikotobaWindow();
    }

    /**
     * 合言葉画面を表示する
     */
    showAikotobaWindow() {
        this.aikotobaWindow.showAikotobaWindow(this.inputKeyBoard.text);
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDownOnlyNumber(key);
        this.aikotobaWindow.showAikotobaWindow(this.inputKeyBoard.text);
        if(key == "Enter" && this.inputKeyBoard.text.length == this.inputKeyBoard.textMax) {
            return this.inputKeyBoard.text;
        }
        return "";
    }

}

/**
 * ニックネーム入力画面を表示するウィンドウ
 */
class AikotobaWindow{
    /**
     * コンストラクタ
     */
    constructor() {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");

        this.imageLoad();
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        this.aikotoba = new Image();
        this.aikotoba.src = "/static/img/aikotoba.png";
        this.input = new Image();
        this.input.src = "/static/img/aikotoba_input.png";
    }

    /**
     * ニックネームページの表示を行う
     */
    showAikotobaWindow(aikotoba) {
        this.canvasClear();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.ctx.drawImage(this.aikotoba, 200, 0);
        this.showInputAikotoba(aikotoba);
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 入力した合言葉を表示する
     */
    showInputAikotoba(aikotoba) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(aikotoba, 330, 300);
    }
}

