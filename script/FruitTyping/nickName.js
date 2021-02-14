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
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        let moveToPage = this.window.onClick(x, y);
        if(moveToPage == GameController.characterChoose && this.inputKeyBoard.text.length == 0) {
            this.window.canClick();
            return -1;
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
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.title;
        }
        if(this.decision.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.characterChoose;
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