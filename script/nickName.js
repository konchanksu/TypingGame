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
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDown(key);
        if(key == "Enter") {
            return this.inputKeyBoard.text;
        }
        return "";
    }
}
