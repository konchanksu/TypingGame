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
     * 入力したニックネームを返す
     * @return ニックネーム
     */
    getNickName() {
        return this.inputKeyBoard.text;
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDown(key);
        this.window.showWindow(this.inputKeyBoard.text);
        AudioUsedRegularly.playAudioCorrectType();
    }

    /**
     * マウスが下がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.window.mouseDown(x, y, this.inputKeyBoard.text);
    }

    /**
     * マウスが動いた時に行う処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.window.mouseMove(x, y, this.inputKeyBoard.text);
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        let moveToPage = this.window.onClick(x, y, this.inputKeyBoard.text);
        if(moveToPage == MovePage.AHEAD_PAGE && this.inputKeyBoard.text.length == 0) {
            this.window.canClick();
            return MovePage.CURRENT_PAGE;
        }
        return moveToPage;
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
        this.decision.setAbleClick(false);
    }

    /**
     * ボタンを押せるようにする
     */
    canClick() {
        this.undo.setAbleClick(true);
        this.decision.setAbleClick(true);
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.description = Images.getImage("nickname");
        this.input = Images.getImage("nickname_input");
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y, text) {
        super.mouseDown(x, y);
        this.showWindow(text);
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y, text) {
        super.mouseMove(x, y);
        this.showWindow(text);
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y, text) {
        super.mouseUp(x, y);
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return MovePage.BEHIND_PAGE;
        }
        if(this.decision.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return MovePage.AHEAD_PAGE;
        }
        this.showWindow(text);
        return MovePage.CURRENT_PAGE;
    }

    /**
     * ニックネームページの表示を行う
     * @param nickname ニックネーム
     */
    showWindow(nickname) {
        this.canvasClear();
        this.showBackGround();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.ctx.drawImage(this.description, 200, 0);
        this.showFrame();
        this.showInputNickName(nickname);
        this.showUndo();
        this.showDecisionButton();
    }

    /**
     * 入力したニックネームを表示する
     */
    showInputNickName(nickname) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(nickname, 330, 300);
    }

    /**
     * 決定ボタンを表示する
     */
    showDecisionButton() {
        let startH = 450;
        this.showDecision((this.windowWidth - this.decision.width()) / 2, startH);
    }
}
