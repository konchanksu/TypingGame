/**
 * マルチプレイゲームを管理するクラス
 */
class MultiGame {
    /**
     * コンストラクタ
     */
    constructor(nickName, characterId) {
        // キャラクター
        this.aiteCharacter;
        this.character = Characters.characters(characterId);

        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;

        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet(this.nowItem.hiragana_data);
        this.nickName = nickName;
        this.window = new BattleWindow();
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGetDouble();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);

        this.window.showKanjiText(this.nowKanji);
        this.window.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
    }

    /**
     * hp情報の取得を行う
     * @return {Integer} 相手のhp
     */
    getHp() {
        return this.character.getHp();
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
     * 間違った入力だった時の処理
     * @return 0なら問題なし，マイナスなら終了
     */
    missTyping() {
        let hp = this.character.getHp();
        this.character.downAttack();

        const live = this.character.flowDamage();
        const hpAfter = this.character.getHp();

        this.setMyHp();
        this.window.showAttack(this.character.getAttack());
        this.window.showDamageWait(this.character.getDamageWait(), this.character.getDamageWaitMax());

        if(!live) { return [-1, ""]; }
        else if(hp != hpAfter) { return [hpAfter, "aiteStatus"]; }
        else { return [0, ""]; }
    }

    /**
     * ダメージを受けた時の処理
     * @param {Integer} damage ダメージ量
     * @return {Boolean} 生きているかどうか
     */
    receiveDamage(damage) {
        const live = this.character.receiveDamage(damage);

        this.setMyHp();
        this.window.showDamageWait(this.character.getDamageWait(), this.character.getDamageWaitMax());
        return live;
    }

    /**
     * 正しい入力だった時の処理
     * @param key
     * @return {Integer} 与えるダメージ, マイナスなら終わり
     */
    rightTyping(key) {
        this.alreadyType += key;
        this.window.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        // 打ち終わったかどうか
        if(this.hiraganaToAlphabet.isFinished()) {
            this.changeText();
            this.character.upAttack();

            let damage = this.character.toAttack();

            this.window.showAttack(this.character.getAttack());
            this.window.showDamageWait(this.character.getDamageWait(), this.character.getDamageWaitMax());
            return [damage, "attack"];
        }
        return [0, ""];
    }

    /**
     * 自分の体力を設定する
     */
    setMyHp() {
        const hp = this.character.getHp();
        const maxHp = this.character.getHpMax();

        this.window.showHp(hp, maxHp);
        this.window.showNamePlate(this.nickName, hp, maxHp);
        this.window.showDamageWait(this.character.getDamageWait(), this.character.getDamageWaitMax());
    }

    /**
     * 相手のキャラクターをセットする
     * @param {String} characterId キャラクターの番号
     */
    setAiteCharacter(characterId) {
        this.aiteCharacter = Characters.characters(parseInt(characterId));
    }

    /**
     * 相手のステータスをセットする
     * @param {String} 相手のhp
     */
    setAiteHp(hpString) {
        this.aiteCharacter.setHp(parseInt(hpString));
        this.window.showAiteHp(this.aiteCharacter.getHp(), this.aiteCharacter.getHpMax());
    }

    /**
     * 相手のニックネームを設定
     * @param {String} aiteNickname 相手のニックネーム
     */
    setAiteNickname(aiteNickname) {
        // 相手のニックネーム
        this.aiteNickname = aiteNickname;
    }

    /**
     * バトル画面を表示させる
     */
    showWindow() {
        const aiteHp = this.aiteCharacter.getHp();
        const aiteHpMax = this.aiteCharacter.getHpMax();
        const aiteImage = this.aiteCharacter.getImage();

        const attack = this.character.getAttack();
        const damageWait = this.character.getDamageWait();
        const damagaeWaitMax = this.character.getDamageWaitMax();
        const hp = this.character.getHp();
        const hpMax = this.character.getHpMax();
        const image = this.character.getImage();

        this.window.canvasClear();
        this.window.showFrame();
        this.window.showMyChara(image);
        this.window.showKanjiText(this.nowKanji);
        this.window.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        this.window.showHp(hp, hpMax);
        this.window.showNamePlate(this.nickName, hp, hpMax);
        this.window.showAiteHp(aiteHp, aiteHpMax);
        this.window.showAiteNickName(this.aiteNickname);
        this.window.showAiteChara(aiteImage);
        this.window.showAttack(attack);
        this.window.showDamageWait(damageWait, damagaeWaitMax);
    }
}

/**
 * バトル画面の表示を行うクラス
 */
class BattleWindow extends WindowParents{
    constructor() {
        super();
        this.imageLoad();
    }

    /**
     * イメージを読み込む
     */
    imageLoad() {
        super.imageLoad();
        this.attack = Images.getImage("attack");
    }

    /**
     * 平仮名部分の消去
     */
    kanjiClear() {
        let width = 270;
        this.ctx.clearRect(this.canvas.width/2-width/2, 200, width, 60);
    }

    /**
     * ローマ字部分のクリア
     */
    romajiClear(){
        let width = 270;
        this.ctx.clearRect(this.canvas.width/2-width/2, 180, width, 40);
    }

    /**
     * 相手のキャラクターを表示
     * @param chara キャラクターイメージ
     */
    showAiteChara(chara) {
        this.ctx.drawImage(chara, 500, 0);
    }

    /**
     * 相手のHPを表示する
     * @param hp 相手Hp
     * @param maxHp 相手の最大Hp
     */
    showAiteHp(hp, maxHp) {
        let width = 150;
        let height = 10;
        let startW = this.canvas.width*5 / 6 - width / 2;
        let startH = 480;

        this.ctx.clearRect(startW, startH, width, height);

        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        this.ctx.fillRect(startW, startH, width, height);

        let diff = (1 - hp / maxHp) * width;
        startW += diff;
        width -= diff;

        this.ctx.fillStyle = ColorUsedReguraly.HP_BAR;
        this.ctx.fillRect(startW, startH, width, height);
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
        let height = 470;

        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        this.ctx.fillText(nickName, (start - textWidth/2), height);
    }

    /**
     * 攻撃力を表示
     * @param attack 攻撃力
     */
    showAttack(attack) {
        let num = parseInt(attack / 30) + 1;
        let imgWidth = this.attack.width;
        let between = 10;
        let startH = 330;
        let startW = parseInt(this.canvas.width/2 + imgWidth*3/2 + between*2);

        this.ctx.clearRect(
            parseInt(this.canvas.width/2 - imgWidth*5/2 - between*2)-1,
            startH,
            between*4+imgWidth*5+1,
            this.attack.height
        );

        for(let i = 0; i < num; i++) {
            this.ctx.drawImage(this.attack, startW, startH);
            startW -= between + imgWidth;
        }
    }

    /**
     * ダメージ待機に応じてダメージを表示する
     * @param damageWaitMax 最大値
     * @param {*} damageWait 現在のダメージ待機
     */
    showDamageWait(damageWait, damageWaitMax) {
        let width = 25;
        let height = 400;
        let startW = 235;
        let startH = 50;

        this.ctx.clearRect(startW, startH, width, height);

        this.ctx.strokeStyle = "#666666";
        this.ctx.strokeRect(startW, startH, width, height);

        this.ctx.fillStyle = "#ff9933";
        let wariai = damageWait / damageWaitMax;
        let goalH = startH + height;
        height = parseInt(height * wariai);
        startH = goalH - height;
        let blank = 2;
        this.ctx.fillRect(startW + blank, startH, width - blank*2, height);
    }

    /**
     * 残りHPを表示する
     * いい感じで図形と文字を組み合わせてみたい...
     * @param hp 残りHP
     */
    showHp(hp, maxHp) {
        let width = 250;
        let height = 20;
        let startH = 390;
        let startW = (this.canvas.width - width) / 2;
        const startWcotei = startW;
        const widthcotei = width;
        let brank = 3;

        this.ctx.fillStyle = "#F0F0F0";
        this.ctx.clearRect(startW - brank, startH - brank, width + brank*2, height + brank*2);
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
        this.ctx.strokeRect(startWcotei - brank, startH - brank, widthcotei + brank*2, height + brank*2);

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
        this.ctx.font = "20px osaka-mono";
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
     * 自キャラの小さい体力ゲージを表示する
     * @param {*} hp 体力
     * @param {*} maxHp 最大体力
     */
    showMyMiniHp(hp, maxHp) {
        let width = 150;
        let height = 10;
        let startW = this.canvas.width / 6 - width / 2;
        let startH = 480;

        this.ctx.clearRect(startW, startH, width, height);

        this.ctx.fillStyle = "#666666";
        this.ctx.fillRect(startW, startH, width, height);

        let diff = (1 - hp / maxHp) * width;
        startW += diff;
        width -= diff;

        this.ctx.fillStyle = "#73E396";
        this.ctx.fillRect(startW, startH, width, height);
    }

    /**
     * ネームプレートを表示する
     * @param {*} nickName
     * @param {*} hp
     * @param {*} maxHp
     */
    showNamePlate(nickName, hp, maxHp) {
        this.ctx.drawImage(Images.getImage("name_plate"), -10, 410);
        this.showNickName(nickName);
        this.showMyMiniHp(hp, maxHp);
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
        let height = 470;

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

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(already, start, height);

        this.ctx.fillStyle = "black";
        this.ctx.fillText(yet, start + already.length*fontSize / 2, height);
    }
}

