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

        this.aikotobaWindow.showInputAikotoba("");
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDownOnlyNumber(key);
        this.aikotobaWindow.showInputAikotoba(this.inputKeyBoard.text);
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
        this.ctx.font = "24px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
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
        this.canvasClear();
        this.ctx.fillText(aikotoba, 100, 100);
    }
}

