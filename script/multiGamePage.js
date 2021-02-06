/**
 * マルチプレイゲームを管理するクラス
 */
class MultiGame {
    /**
     * コンストラクタ
     */
    constructor() {
        // キャラクター
        this.character = new CharacterAlpha();
        this.aiteCharacter;

        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet(this.nowItem.hiragana_data);
        this.aiteStartHp = -1;
        this.battleWindow = new BattleWindow();
    }

    /**
     * バトル画面を表示させる
     */
    showBattleWindow() {
        this.battleWindow.canvasClear();
        this.battleWindow.showKanjiText(this.nowKanji);
        this.battleWindow.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        this.battleWindow.showHp(this.character.hp, this.character.maxHp);
        this.battleWindow.showAttack(this.character.attackPower);
    }

    /**
     * 相手のニックネームを設定
     */
    setAiteNickname(aiteNickname) {
        // 相手のニックネーム
        this.aiteNickname = aiteNickname;
    }

    /**
     * 相手のキャラクターをセットする
     * @param {String} characterId キャラクターの番号
     */
    setAiteCharacter(characterId) {
        switch(characterId) {
            case "1":
                this.aiteCharacter = new CharacterAlpha();
                break;
        }
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);

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
            this.battleWindow.showAttack(this.character.attackPower);
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
    reseiveDamage(damageData) {
        let live = this.character.damage(damageData);
        this.battleWindow.showHp(this.character.hp, this.character.maxHp);
        return live;
    }

    /**
     * hp情報の取得を行う
     * @return {Integer} 相手のhp
     */
    getHp() {
        return this.character.hp;
    }

    /**
     * 相手のステータスをセットする
     * @param {String} 相手のhp
     */
    setAiteHp(hpString) {
        if(this.aiteStartHp < 0) { this.aiteStartHp = parseInt(hpString); }
        this.aiteCharacter.hp = parseInt(hpString);
    }
}

/**
 * バトル画面の表示を行うクラス
 */
class BattleWindow {
    constructor() {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.canvasClear();
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 平仮名部分の消去
     */
    kanjiClear() {
        this.ctx.clearRect(0, 150, this.canvas.width, 60);
    }

    /**
     * 平仮名文字列を表示する
     * @param {*} kanjiText 平仮名の文字列
     */
    showKanjiText(kanjiText) {
        this.kanjiClear();
        this.ctx.font = "28px osaka-mono";
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        let textWidth = this.ctx.measureText( kanjiText ).width;

        this.ctx.fillText(kanjiText, (this.canvas.width - textWidth) / 2, 200);
    }

    /**
     * ローマ字部分のクリア
     */
    romajiClear(){
        this.ctx.clearRect(0, 100, this.canvas.width-200, 60);
    }

    /**
     * ローマ字を表示する
     * @param {*} str
     */
    showRomaji(already, yet) {
        let fontSize = 20;
        this.ctx.font = fontSize.toString() + "px osaka-mono";
        let textWidth = this.ctx.measureText( already + yet ).width;
        let start = (this.canvas.width - textWidth) / 2;
        let height = 150;

        this.romajiClear();

        this.ctx.fillStyle = "gray";
        this.ctx.fillText(already, start, height);

        this.ctx.fillStyle = "black";
        this.ctx.fillText(yet, start + already.length*fontSize / 2, height);
    }

    /**
     * 残りHPを表示する
     * いい感じで図形と文字を組み合わせてみたい...
     * @param hp 残りHP
     */
    showHp(hp, maxHp) {
        let width = 300;
        let height = 20;
        let startH = 390;
        let startW = (this.canvas.width - width) / 2;

        this.ctx.fillStyle = "#F0F0F0";
        this.ctx.clearRect(startW, startH, width, height);
        this.ctx.fillRect(startW, startH, width, height);

        this.ctx.fillStyle = "#73E396";
        let diff = (1 - (hp / maxHp)) * width;
        startW += diff;
        width -= diff;
        this.ctx.fillRect(startW, startH, width, height);

        this.ctx.fillStyle = "#49C478";
        this.ctx.fillRect(startW, startH + height / 2, width, height/2);

        this.ctx.strockStyle = "#202020";
        this.ctx.strockWidth = 2;
        let brank = 3;
        this.ctx.strokeRect(startW - brank, startH - brank, width + brank*2, height + brank*2);
    }

    /**
     * 相手のHPを表示する
     * @param hp 相手Hp
     */
    showAiteHp(hp) {
        this.ctx.clearRect(500, 0, this.canvas.width - 500, 80);
        this.ctx.fillText(hp.toString(), 500, 70);
    }

    /**
     * 攻撃力を表示
     */
    showAttack(attack) {
        let width = 100;
        let between = 10;
        let startW = (this.canvas.width + width) / 2;
        let startH = 330;
        let atk = attack;
    }
}

