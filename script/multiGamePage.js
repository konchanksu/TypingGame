/**
 * マルチプレイゲームを管理するクラス
 */
class MultiGame {
    /**
     * コンストラクタ
     */
    constructor(aiteNickName) {
        // 相手のニックネーム
        this.aiteNickName = aiteNickName;

        // キャラクター
        this.character = new CharacterAlpha();

        console.log(this.character);

        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet(this.nowItem.hiragana_data);

        this.battleWindow = new BattleWindow();
        this.battleWindow.showKanjiText(this.nowKanji);
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);

        this.battleWindow.canvasClear();
        this.battleWindow.showKanjiText(this.nowKanji);
        this.battleWindow.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
    }

    /**
     * キー入力があった時の処理
     * @param key
     * @return {Integer} 与えるダメージ
     */
    inputKeyDown(key) {
        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            return this.rightTyping(key);
        }
        return this.missTyping();
    }

    /**
     * 正しい入力だった時の処理
     * @param key
     * @return {Integer} 与えるダメージ, マイナスなら終わり
     */
    rightTyping(key) {
        this.alreadyType += key;
        this.battleWindow.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        // 打ち終わったかどうか
        if(this.hiraganaToAlphabet.isFinished()) {
            this.changeText();
            this.character.attackUp();
            return this.character.toAttack();
        }
        return 0;
    }

    /**
     * 間違った入力だった時の処理
     */
    missTyping() {
        this.character.attackDown();
        if(this.character.damageFlow()) { return 0 };
        return -1;
    }

    /**
     * ダメージを受けた時の処理
     * @param {Integer} damageData ダメージ量
     * @return {Boolean} 生きているかどうか
     */
    getDamage(damageData) {
        return this.character.damage(damageData);
    }
}

/**
 * バトル画面の表示を行うクラス
 */
class BattleWindow {
    constructor() {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "24px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        this.canvasClear();
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 平仮名文字列を表示する
     * @param {*} hiraganaText 平仮名の文字列
     */
    showKanjiText(hiraganaText) {
        this.ctx.fillText(hiraganaText, 0, 150);
    }

    /**
     * ローマ字を表示する
     * @param {*} str
     */
    showRomaji(already, yet) {
        this.ctx.clearRect(0, 50, this.canvas.width, 80);
        this.ctx.fillStyle = "gray";
        this.ctx.fillText(already, 0, 100);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(yet, already.length*12, 100);
    }

}

