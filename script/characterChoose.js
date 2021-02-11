/**
 * キャラクター選択画面を管理するクラス
 */
class CharacterChoosePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.characterChooseWindow = new CharacterChooseWindow();
    }

    /**
     * キー入力があった時の表示するクラス
     */
    inputKeyDown(key) {
        
    }

    /**
     * ウィンドウ表示する
     */
    showWindow() {

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

    imageLoad() {
        super.imageLoad();
    }
}
