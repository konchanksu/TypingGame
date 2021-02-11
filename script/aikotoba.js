/**
 * 合言葉を入力するページ
 */
class AikotobaPage{
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
     * キー入力があった時の処理
     */
    inputKeyDown(key) {
        this.inputKeyBoard.inputKeyDownOnlyNumber(key);
        this.window.showWindow(this.inputKeyBoard.text);
        if(key == "Enter" && this.inputKeyBoard.text.length == this.inputKeyBoard.textMax) {
            this.window.playAudioKettei();
            return this.inputKeyBoard.text;
        }
        this.window.playAudioCorrectType();
        return "";
    }

    /**
     * クリックした時の処理
     * @param {*} x
     * @param {*} y
     * @return クリックした後の遷移先
     */
    onClick(x, y) {
        　return this.window.onClick(x, y);
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
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            super.playAudioKettei();
            this.cannotClick();
            return GameController.nickName;
        }
        return -1;
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
    }

    /**
     * 入力した合言葉を表示する
     */
    showInputAikotoba(aikotoba) {
        this.ctx.drawImage(this.input, 140, 130);
        this.ctx.fillText(aikotoba, 330, 300);
    }
}

