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
