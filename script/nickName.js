/**
 * ニックネームを入力するページを管理するクラス
 */
class NickNamePage {
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

        this.inputKeyBoard = new InputKeyBoard(10);
        this.nicknameWindow = new NickNameWindow();

        this.nicknameWindow.showInputNickName("");
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDown(key);
        this.nicknameWindow.showInputNickName(this.inputKeyBoard.text);
        if(key == "Enter") {
            return this.inputKeyBoard.text;
        }
        return "";
    }
}

/**
 * ニックネーム入力画面を表示するウィンドウ
 */
class NickNameWindow{
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
     * 入力したニックネームを表示する
     */
    showInputNickName(nickname) {
        this.canvasClear();
        this.ctx.fillText(nickname, 100, 100);
    }
}
