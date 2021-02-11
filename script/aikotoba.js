/**
 * 合言葉を入力するページ
 */
class AikotobaPage{
    /**
     * コンストラクタ
     */
    constructor() {
        this.inputKeyBoard = new InputKeyBoard(6);
        this.aikotobaWindow = new AikotobaWindow();
    }

    /**
     * 合言葉画面を表示する
     */
    showWindow() {
        this.aikotobaWindow.showWindow(this.inputKeyBoard.text);
    }

    /**
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDownOnlyNumber(key);
        this.aikotobaWindow.showWindow(this.inputKeyBoard.text);
        if(key == "Enter" && this.inputKeyBoard.text.length == this.inputKeyBoard.textMax) {
            this.aikotobaWindow.playAudioKettei();
            return this.inputKeyBoard.text;
        }
        this.aikotobaWindow.playAudioCorrectType();
        return "";
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
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.aikotoba = new Image();
        this.aikotoba.src = "/static/img/aikotoba.png";
        this.input = new Image();
        this.input.src = "/static/img/aikotoba_input.png";
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
    }

    /**
     * 入力した合言葉を表示する
     */
    showInputAikotoba(aikotoba) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(aikotoba, 330, 300);
    }
}

