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
     * マウスが下がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.window.mouseDown(x, y);
    }

    /**
     * マウスが動いた時に行う処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.window.mouseMove(x, y);
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     * @return 遷移先のページ
     */
    onClick(x, y) {
        let movePage, character;
        [movePage, character] = this.window.onClick(x, y);
        this.character = character;
        return movePage;
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
        this.charaStartH = 50;
        this.charaStartW = 125;
        this.characters = [];
        this.onHoverImage = undefined;
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, Images.getImage("lemon")]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, Images.getImage("lemon")]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, Images.getImage("lemon")]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, Images.getImage("lemon")]);
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
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        super.mouseDown(x, y);
        this.showWindow();
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        super.mouseMove(x, y);
        this.showWindow();
        let self = this;
        this.characters.forEach((character) => {
            if(character[0].onClick(x, y)) {
                self.showACharacter(character[2]);
            }
        })
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     */
    onClick(x, y) {
        super.mouseUp(x, y);
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return [MovePage.BEHIND_PAGE, -1];
        }
        let filterList = this.characters.filter((character) => character[0].onClick(x, y));
        if(filterList.length != 0) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return [MovePage.AHEAD_PAGE, filterList[0][1]];
        }
        this.showWindow();
        return [MovePage.CURRENT_PAGE, -1];
    }

    /**
     * ウィンドウを表示する
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showUndo();
        this.showCharacters();
    }

    showACharacter(image) {
        this.ctx.drawImage(image, this.charaStartW, this.charaStartH);
        this.onHoverImage = image;
    }

    /**
     * キャラクター1ボタンを表示する
     */
    showCharacters() {
        let startW = 500;
        let startH = 50;
        let blank = 1;
        this.characters[0][0].drawImage(startW, startH);

        startH += this.characters[0][0].height() + blank;
        startW -= this.characters[0][0].width() / 2 + blank;
        this.characters[1][0].drawImage(startW, startH);

        startW += this.characters[1][0].width() + blank;
        this.characters[2][0].drawImage(startW, startH);

        startH += this.characters[2][0].height() + blank;
        startW -= this.characters[2][0].width() / 2 - blank;
        this.characters[3][0].drawImage(startW, startH);
    }
}
