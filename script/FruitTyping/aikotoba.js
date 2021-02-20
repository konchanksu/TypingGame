/**
 * 合言葉を入力するページ
 */
class AikotobaPage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.inputKeyBoard = new InputKeyBoard(6);
        this.window = new AikotobaWindow();
    }

    /**
     * 入力したニックネームを返す
     * @return ニックネーム
     */
    getAikotoba() {
        return this.inputKeyBoard.text;
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDownOnlyNumber(key);
        this.window.setAikotoba(this.inputKeyBoard.text);
        this.showWindow();
        AudioUsedRegularly.playAudioCorrectType();
    }

    /**
     * クリックした時の処理
     * @param {*} x
     * @param {*} y
     * @return クリックした後の遷移先
     */
    onClick(x, y) {
        const movePage = this.window.onClick(x, y);
        if( movePage == MovePage.AHEAD_PAGE && this.inputKeyBoard.text.length != this.inputKeyBoard.textMax ) {
            this.window.canClick();
            return MovePage.CURRENT_PAGE;
        }
        return movePage;
    }
}

/**
 * 合言葉入力画面を表示するウィンドウ
 */
class AikotobaWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
        this.text = "";
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.description = Images.getImage("aikotoba");
        this.input = Images.getImage("aikotoba_input");
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
        this.showInputAikotoba();
        this.showUndo();
        this.showDecisionButton();
    }

    /**
     * 入力した合言葉を表示する
     */
    showInputAikotoba() {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(this.text, 330, 300);
    }

    /**
     * 合言葉を設定する
     * @param {*} aikotoba
     */
    setAikotoba(aikotoba) {
        this.text = aikotoba;
    }

    /**
     * 決定ボタンを表示する
     */
    showDecisionButton() {
        const startH = 450;
        this.showDecision((this.windowWidth - this.decision.width()) / 2, startH);
    }
}

