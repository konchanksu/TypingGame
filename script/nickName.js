/**
 * ニックネームを入力するページを管理するクラス
 */
class NickNamePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.inputKeyBoard = new InputKeyBoard(10);
        this.window = new NickNameWindow();
    }

    /**
     * ニックネームページの表示を行う
     */
    showWindow() {
        this.window.showWindow(this.inputKeyBoard.text);
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDown(key);
        this.window.showWindow(this.inputKeyBoard.text);
        if(key == "Enter") {
            this.window.playAudioKettei();
            return this.inputKeyBoard.text;
        }
        this.window.playAudioCorrectType();
        return "";
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        return this.window.onClick(x, y);
    }
}

/**
 * ニックネーム入力画面を表示するウィンドウ
 */
class NickNameWindow extends WindowParents {
    constructor() {
        super();
        this.imageLoad();
    }

    /**
     * クリックできなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.description = new Image();
        this.description.src = "/static/img/nickname.png";
        this.input = new Image();
        this.input.src = "/static/img/nickname_input.png";
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            super.playAudioKettei();
            this.cannotClick();
            return GameController.title;
        }
        return -1;
    }

    /**
     * ニックネームページの表示を行う
     * @param nickname ニックネーム
     */
    showWindow(nickname) {
        this.canvasClear();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.ctx.drawImage(this.description, 200, 0);
        this.showFrame();
        this.showInputNickName(nickname);
        super.showUndo();
    }

    /**
     * 入力したニックネームを表示する
     */
    showInputNickName(nickname) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(nickname, 330, 300);
    }
}
