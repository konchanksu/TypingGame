/**
 * キャラクター選択画面を表示するウィンドウ
 */
class CharacterChooseWindow extends WindowParents {
    constructor() {
        super();
        this.imageLoad();
        this.charaHeight = 100;
        this.charaWidth = 30;
        this.onHoverImage = undefined;
        this.canMoveFlag = true;
        this.characters = [];
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, "lemon_small"]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, "lemon_small"]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, "lemon_small"]);
        this.characters.push([new ButtonOnCanvas("lemon_box"), Characters.lemon, "lemon_small"]);
    }

    /**
     * 小さいジャンプのアニメーションの表示
     */
    async movePageAnimation() {
        const max = 9;
        const waitTime = 30;

        const movePosition = upAndDownAnimation(max, this.charaHeight, this.charaHeight - 30);
        for(const value of movePosition) {
            await sleep(waitTime);
            this.charaHeight = value;
            this.showWindow( {imageStr:this.onHoverImage} );
        }

        return new Promise(resolve => resolve());
    }

    canClick() {
        this.canMoveFlag = true;
    }

    /**
     * クリックできなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
        this.characters.forEach(character => character[0].setAbleClick(false));
        this.canMoveFlag = false;
    }

    /**
     * イメージを読み込む
     */
    imageLoad() {
        super.imageLoad();

        this.description = Images.getImage("characterChoose");
    }

    /**
     * ページ移動する時に行う処理
     */
    async movePage() {
        this.cannotClick();
        AudioUsedRegularly.playAudioKettei();
        await this.movePageAnimation();
        await sleep(300);
        return new Promise(resolve => resolve());
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        if(!this.canMoveFlag) { return; }
        this.characters.forEach(character => { character[0].mouseMove(x, y); });
        const onChara = this.characters.filter((character) => { return character[0].onClick(x, y); });
        if(onChara.length != 0) {
            onChara.forEach(character => { this.showWindow( {imageStr:character[2]} ); });
        }
        else{ this.showWindow(); }
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        if(!this.canMoveFlag) { return; }
        this.undo.mouseDown(x, y);
        this.characters.forEach(character => { character[0].mouseDown(x, y); });
        this.showWindow( {imageStr:this.onHoverImage} );
    }

    /**
     * クリックがあった時の処理
     * @param {*} x
     * @param {*} y
     */
    async onClick(x, y) {
        if(!this.canMoveFlag) { return; }
        super.mouseUp(x, y);
        this.characters.forEach(character => { character[0].mouseUp(x, y); });
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return [MovePage.BEHIND_PAGE, -1];
        }
        const filterList = this.characters.filter((character) => character[0].onClick(x, y));
        if(filterList.length != 0) {
            await this.movePage();
            return [MovePage.AHEAD_PAGE, filterList[0][1]];
        }
        this.showWindow();
        return [MovePage.CURRENT_PAGE, -1];
    }

    /**
     * ウィンドウを表示する
     * @param imageStr 文字列を表示する
     */
    showWindow({imageStr} = {}) {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showUndo();
        this.showDescription();
        this.showCharacters();
        this.showACharacter(imageStr);
    }

    /**
     * ホバー時にキャラを表示する
     * @param {str} imageStr イメージの文字列
     */
    showACharacter(imageStr) {
        this.onHoverImage = imageStr;
        if(this.onHoverImage != undefined) {
            const showImage = Images.getImage(this.onHoverImage);
            this.ctx.drawImage(showImage, this.charaWidth, this.charaHeight);
        }
    }

    /**
     * キャラクター1ボタンを表示する
     */
    showCharacters() {
        let startW = 500;
        const move = 130;
        let startH = 320;

        this.characters[0][0].drawImage(startW - this.characters[0][0].width()/2, startH - this.characters[0][0].height()/2);

        startW += move;
        this.characters[1][0].drawImage(startW - this.characters[1][0].width()/2, startH - this.characters[1][0].height()/2);

        startH += move;
        startW -= parseInt(move * (1/2));
        this.characters[2][0].drawImage(startW - this.characters[2][0].width()/2, startH - this.characters[2][0].height()/2);

        startW += move;
        this.characters[3][0].drawImage(startW - this.characters[3][0].width()/2, startH - this.characters[3][0].height()/2);
    }
}
