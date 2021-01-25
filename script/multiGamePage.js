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

        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.hiraganaToAlphabet = new HiraganaToAlphabet(this.nowItem.hiragana_data);
        console.log(this.nowKanji);
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);
        console.log(this.nowKanji);
    }

    /**
     * キー入力があった時の処理
     * @param key
     * @return {Integer} 与えるダメージ
     */
    inputKeyDown(key) {
        console.log(this.hiraganaToAlphabet.romajiChangeListHead());
        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            return this.rightTyping();
        }
        return this.missTyping();
    }

    /**
     * 正しい入力だった時の処理
     * @return {Integer} 与えるダメージ, マイナスなら終わり
     */
    rightTyping() {
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
}
