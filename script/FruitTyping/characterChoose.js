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
        let page, character;
        [page, character] = this.window.onClick(x, y);
        this.character = character;
        return page;
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
        this.characters = [];
        this.characters.push([new ButtonForCharacters("character1_box"), this.characters.length+1]);
        this.characters.push([new ButtonForCharacters("character1_box"), this.characters.length+1]);
        this.characters.push([new ButtonForCharacters("character1_box"), this.characters.length+1]);
        this.characters.push([new ButtonForCharacters("character2_box"), this.characters.length+1]);
    }

    /**
     * クリックできなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
        this.characters.forEach(character => character[0].setAbleClick(false));
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
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return [GameController.nickName, -1];
        }
        let filterList = this.characters.filter((character) => character[0].onClick(x, y));
        if(filterList.length != 0) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return [GameController.aikotoba, 1];
        }
        return [-1, -1];
    }

    /**
     * ウィンドウを表示する
     */
    showWindow() {
        this.canvasClear();
        this.showFrame();
        this.showUndo();
        this.showCharacters();
    }

    /**
     * キャラクター1ボタンを表示する
     */
    showCharacters() {
        let startW = 500;
        let startH = 50;
        this.characters[0][0].drawImage(startW, startH);

        startH += this.characters[0][0].height();
        startW -= this.characters[0][0].width() / 2;
        this.characters[1][0].drawImage(startW, startH);

        startW += this.characters[1][0].width();
        this.characters[2][0].drawImage(startW, startH);

        startH += this.characters[2][0].height();
        startW -= this.characters[2][0].width() / 2;
        this.characters[3][0].drawImage(startW, startH);
    }
}
