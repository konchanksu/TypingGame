class SingleWaitPage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.window = new SingleWaitWindow();
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

    /**
     * キーが下がった時の処理
     * @param {*} key
     */
    inputKeyDown(key) {
        if(key == " ") { return MovePage.AHEAD_PAGE; }
        return MovePage.CURRENT_PAGE;
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
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns クリック後の遷移先
     */
    onClick(x, y) {
        super.mouseUp(x, y);
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return MovePage.BEHIND_PAGE;
        }
        this.showWindow();
        return MovePage.CURRENT_PAGE;
    }

    /**
     * イメージを表示する
     */
    imageLoad() {
        super.imageLoad();
        this.description = Images.getImage("junbiOK");
    }

    /**
     * ページを表示する
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showUndo();
        this.showDescription();
    }
}
