/**
 * ニックネームを入力するページを管理するクラス
 */
class NickNamePage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.inputKeyBoard = new InputKeyBoard(10);
        this.window = new NickNameWindow();
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
        this.window.setNickName(this.inputKeyBoard.text);
        this.showWindow();
        AudioUsedRegularly.playAudioCorrectType();
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        const moveToPage = this.window.onClick(x, y);
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
        this.text = "";
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
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
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
        this.showWindow();
        return MovePage.CURRENT_PAGE;
    }

    /**
     * ニックネームページの表示を行う
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.showDescription();
        this.showFrame();
        this.showInputNickName();
        this.showUndo();
        this.showDecisionButton();
    }

    /**
     * ニックネームをセットする
     * @param {*} nickname
     */
    setNickName(nickname) {
        this.text = nickname;
    }

    /**
     * 入力したニックネームを表示する
     */
    showInputNickName() {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(this.text, 330, 300);
    }

    /**
     * 決定ボタンを表示する
     */
    showDecisionButton() {
        let startH = 450;
        this.showDecision((this.windowWidth - this.decision.width()) / 2, startH);
    }
}
