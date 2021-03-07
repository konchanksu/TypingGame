/**
 * キャラクター選択画面を管理するクラス
 */
 class CharacterChoosePage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.window = new CharacterChooseWindow();
        this.character = -1;
    }

    /**
     * 画面表示を行う
     */
    showWindow() {
        this.window.canClick();
        this.window.showWindow();
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
        return Promise.resolve(this.window.onClick(x, y)).then( resolve => {
            this.character = resolve[1];
            return resolve[0];
        });
    }
}
