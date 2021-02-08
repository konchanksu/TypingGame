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
        this.inputKeyBoard = new InputKeyBoard(10);
        this.nicknameWindow = new NickNameWindow();
    }

    /**
     * ニックネームページの表示を行う
     */
    showNickNameWindow() {
        this.nicknameWindow.showNickNameWindow(this.inputKeyBoard.text);
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDown(key);
        this.nicknameWindow.showNickNameWindow(this.inputKeyBoard.text);
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
        this.imageLoad();
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        this.description = new Image();
        this.description.src = "/static/img/nickname.png";
        this.input = new Image();
        this.input.src = "/static/img/nickname_input.png";
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * ニックネームページの表示を行う
     */
    showNickNameWindow(nickname) {
        this.canvasClear();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.ctx.drawImage(this.description, 200, 0);
        this.showInputNickName(nickname);
    }

    /**
     * 入力したニックネームを表示する
     */
    showInputNickName(nickname) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(nickname, 330, 300);
    }
}
