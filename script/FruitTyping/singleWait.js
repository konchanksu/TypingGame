class SingleWaitPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new SingleWaitWindow();
    }

    /**
     * ウィンドウを表示する
     */
    showWindow() {
        this.window.showWindow();
    }

    /**
     * クリック時の動作
     * @param {*} x
     * @param {*} y
     * @returns クリック後の遷移先を表示する
     */
    onClick(x, y) {
        return this.window.onClick(x, y);
    }
}

/**
 * ゲームの待機画面を作成する
 */
class SingleWaitWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
    }

    /**
     * ボタンを押せなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
        this.decision.setAbleClick(false);
    }

    /**
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns クリック後の遷移先
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
     * イメージを表示する
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * ページを表示する
     */
    showWindow() {
        this.canvasClear();
        this.showFrame();
        this.showUndo();
        this.showDecisionButton();
    }

    /**
     * 決定ボタンを表示する
     */
    showDecisionButton() {
        let startH = 450;
        this.showDecision((this.windowWidth - this.decision.width()) / 2, startH);
    }
}
