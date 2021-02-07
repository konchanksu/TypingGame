/**
 * マルチプレイゲームを管理するクラス
 */
class MultiGame {
    /**
     * コンストラクタ
     */
    constructor(nickName) {
        // キャラクター
        this.character = new CharacterAlpha();
        this.aiteCharacter;

        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet(this.nowItem.hiragana_data);
        this.aiteStartHp = -1;
        this.nickName = nickName;
        this.battleWindow = new BattleWindow();
    }

    /**
     * バトル画面を表示させる
     */
    showBattleWindow() {
        this.battleWindow.canvasClear();
        this.battleWindow.showMyChara(this.character.image);
        this.battleWindow.showKanjiText(this.nowKanji);
        this.battleWindow.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        this.battleWindow.showHp(this.character.hp, this.character.maxHp);
        this.battleWindow.showNickName(this.nickName);
        this.battleWindow.showAiteNickName(this.aiteNickname);
    }

    /**
     * 相手のニックネームを設定
     */
    setAiteNickname(aiteNickname) {
        // 相手のニックネーム
        this.aiteNickname = aiteNickname;
        console.log(this.aiteNickname);
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
     * @return 0なら問題なし，マイナスなら終了
     */
    missTyping() {
        this.character.attackDown();
        if(this.character.damageFlow()) {
            this.battleWindow.showHp(this.character.hp, this.character.maxHp);
            return 0;
        }
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
        console.log(this.character.hp);
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
        this.frame = new Image();
        this.frame = "/static/img/frame.png";
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
        let width = 350;
        this.ctx.clearRect(this.canvas.width/2-width/2, 200, width, 60);
    }

    /**
     * ローマ字部分のクリア
     */
    romajiClear(){
        let width = 350;
        this.ctx.clearRect(this.canvas.width/2-width/2, 180, width, 40);
    }

    /**
     * 相手のキャラクターを表示
     * @param chara キャラクターイメージ
     */
    showAiteChara(chara) {
        
    }

    /**
     * 相手のHPを表示する
     * @param hp 相手Hp
     */
    showAiteHp(hp) {
        
    }

    /**
     * 相手のニックネームを表示する
     * @param nickName ニックネーム
     */
    showAiteNickName(nickName) {
        let fontSize = 28;
        this.ctx.font = fontSize.toString() + "px osaka-mono";
        let textWidth = this.ctx.measureText( nickName ).width;
        let start = (this.canvas.width) * 5 / 6;
        let height = 480;

        this.ctx.fillStyle = "black";
        this.ctx.fillText(nickName, (start - textWidth/2), height);
    }

    /**
     * 攻撃力を表示
     * @param attack 攻撃力
     */
    showAttack(attack) {
        
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

        this.ctx.strokeStyle = "#666666";
        this.ctx.strokeWidth = 2;
        let brank = 3;
        this.ctx.strokeRect(startW - brank, startH - brank, width + brank*2, height + brank*2);

        this.ctx.font = "24px osaka-mono";
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        let text = hp.toString() + "/" + maxHp.toString();
        let textWidth = this.ctx.measureText( text ).width;
        this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, startH+height-2);
    }

    /**
     * 平仮名文字列を表示する
     * @param {*} kanjiText 平仮名の文字列
     */
    showKanjiText(kanjiText) {
        this.kanjiClear();
        this.ctx.font = "24px osaka-mono";
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        let textWidth = this.ctx.measureText( kanjiText ).width;

        this.ctx.fillText(kanjiText, (this.canvas.width - textWidth) / 2, 250);
    }

    /**
     * 自分のキャラクターを表示する
     * @param chara キャラクターイメージ
     */
    showMyChara(chara) {
        this.ctx.drawImage(chara, 0, 0);
    }

    /**
     * 自分のニックネームを表示する
     * @param nickName ニックネーム
     */
    showNickName(nickName) {
        let fontSize = 28;
        this.ctx.font = fontSize.toString() + "px osaka-mono";
        let textWidth = this.ctx.measureText( nickName ).width;
        let start = (this.canvas.width) / 6;
        let height = 480;

        this.ctx.fillStyle = "black";
        this.ctx.fillText(nickName, (start - textWidth/2), height);
    }

    /**
     * ローマ字を表示する
     * @param {*} str
     */
    showRomaji(already, yet) {
        let fontSize = 18;
        this.ctx.font = fontSize.toString() + "px osaka-mono";
        let textWidth = this.ctx.measureText( already + yet ).width;
        let start = (this.canvas.width - textWidth) / 2;
        let height = 210;

        this.romajiClear();

        this.ctx.fillStyle = "gray";
        this.ctx.fillText(already, start, height);

        this.ctx.fillStyle = "black";
        this.ctx.fillText(yet, start + already.length*fontSize / 2, height);
    }
}

