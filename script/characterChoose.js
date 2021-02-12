/**
 * キャラクター選択画面を管理するクラス
 */
class CharacterChoosePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new CharacterChooseWindow();
        this.character = -1;
    }

    /**
     * 決定したキャラクターidを返却する
     * @return キャラクターのid
     */
    getCharacterId() {
        return this.character;
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     * @return 遷移先のページ
     */
    onClick(x, y) {
        return this.window.onClick(x, y);
    }

    /**
     * ウィンドウ表示する
     */
    showWindow() {
        this.window.showWindow();
    }
}

/**
 * キャラクター選択画面を表示するウィンドウ
 */
class CharacterChooseWindow extends WindowParents {
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
     * イメージを読み込む
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            super.playAudioKettei();
            this.cannotClick();
            return GameController.nickName;
        } 
        if(this.decision.onClick(x, y)){
            super.playAudioKettei();
            this.cannotClick();
            return GameController.aikotoba;
        }
        return -1;
    }

    /**
     * ウィンドウを表示する
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
