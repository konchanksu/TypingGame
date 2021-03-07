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
        this.ctx.font = FontUsedReguraly.monoSpace(TextSizeUsedReguraly.MAX);
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;

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
