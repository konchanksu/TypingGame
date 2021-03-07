/**
 * 結果を表示するページ
 */
class ResultWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor(correct, miss) {
        super();
        this.correct = correct.toString();
        this.miss = miss.toString();
        this.imageLoad();
    }

    /**
     * 画像を読み込む
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns 先に進むページ
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
     * 結果を表示する
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showResult();
        this.showCorrectAndMissCount();
        this.showUndo();
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount() {
        let fontSize = 32;
        let text = "正しい入力: "+ this.correct + "  間違えた入力: " + this.miss;

        this.ctx.font = fontSize.toString() + "px ヒラギノ丸ゴ Pro W4";
        let textWidth = this.ctx.measureText( text ).width;
        let height = 450;
        let start = (this.canvas.width - textWidth) / 2;

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(text, start, height);
    }

    /**
     * 結果画像を表示する
     */
    showResult() {
        this.ctx.drawImage(Images.getImage("resultPage"), 0, 0);
    }
}
