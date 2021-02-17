/**
 * 合言葉を入力するページ
 */
class AikotobaPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.inputKeyBoard = new InputKeyBoard(6);
        this.window = new AikotobaWindow();
    }

    /**
     * 合言葉画面を表示する
     */
    showWindow() {
        this.window.showWindow(this.inputKeyBoard.text);
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
        this.window.showWindow(this.inputKeyBoard.text);
        AudioUsedRegularly.playAudioCorrectType();
    }

    /**
     * クリックした時の処理
     * @param {*} x
     * @param {*} y
     * @return クリックした後の遷移先
     */
    onClick(x, y) {
        let movePage = this.window.onClick(x, y);
        if( movePage == MovePage.AHEAD_PAGE && this.inputKeyBoard.text.length != this.inputKeyBoard.textMax ) {
            this.window.canClick();
            return MovePage.CURRENT_PAGE;
        }
        return movePage;
    }
}

/**
 * ニックネーム入力画面を表示するウィンドウ
 */
class AikotobaWindow extends WindowParents {
    /**
     * コンストラクタ
     */
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
        this.aikotoba = Images.getImage("aikotoba");
        this.input = Images.getImage("aikotoba_input");
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
            return MovePage.BEHIND_PAGE;
        }
        if(this.decision.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return MovePage.AHEAD_PAGE;
        }
        return MovePage.CURRENT_PAGE;
    }

    /**
     * ニックネームページの表示を行う
     */
    showWindow(aikotoba) {
        this.canvasClear();
        this.ctx.font = "56px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#ff9933";

        this.ctx.drawImage(this.aikotoba, 200, 0);
        this.showFrame();
        this.showInputAikotoba(aikotoba);
        this.showUndo();
        this.showDecisionButton();
    }

    /**
     * 入力した合言葉を表示する
     */
    showInputAikotoba(aikotoba) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(aikotoba, 330, 300);
    }

    /**
     * 決定ボタンを表示する
     */
    showDecisionButton() {
        let startH = 450;
        this.showDecision((this.windowWidth - this.decision.width()) / 2, startH);
    }
}

