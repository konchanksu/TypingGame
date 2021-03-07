class SinglePlayPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.setSinglePlayWindow();
    }

    /**
     * 新規でプレイする時に画面をセットするメソッド
     */
    setSinglePlayWindow() {
        this.start = false;
        this.finish = false;
        this.character;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet("");
        this.rightTypeCount = 0;
        this.missTypeCount = 0;
        this.window = new SinglePlayWindow();
        this.enemy = new Enemy();
        this.window.setEnemy(this.enemy);
    }

    /**
     * 攻撃を行う
     */
    attack() {
        this.character.upAttack();
        const damage = this.character.toAttack();
        this.enemy.receiveDamage(damage);
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGet();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);

        this.window.showWindow({kanjiText:this.nowKanji});
        this.window.showWindow({already:this.alreadyType, yet:this.hiraganaToAlphabet.romajiChangeListHead()});
    }

    /**
     * キャラクターをセットする
     */
    setCharacter(character) {
        this.character = character;
        this.window.setCharacter(this.character);
    }

    /**
     * ゲームのカウントダウンを表示する
     */
    async gameCountDown() {
        const time = 60;
        for(let i = time; i > 0; i--) {
            this.window.showWindow({time:i});
            await sleep(1000);
            if(this.finish) { return new Promise(resolve => resolve()); }
        }

        return new Promise(resolve => resolve());
    }

    /**
     * マウスが下がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        if(this.finish) { this.window.mouseDown(x, y); }
    }

    /**
     * マウスが動いた時に行う処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        if(this.finish) { this.window.mouseMove(x, y); }
    }

    /**
     * クリック処理をする
     * @param x
     * @param y
     */
    onClick(x, y) {
        if(!this.finish) return MovePage.CURRENT_PAGE;
        return this.window.onClick(x, y);
    }

    /**
     * キーボードを押下する処理
     * @param {*} key
     */
    keyDown(key) {
        if(!this.start || this.finish) return;
        if(key == "Escape") {
            this.showFinish();
            return;
        }

        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            this.rightTyping(key);
        } else {
            this.missTyping();
        }
        this.window.showWindow({correct:this.rightTypeCount, miss:this.missTypeCount});
    }

    /**
     * 正しい入力だった時の処理
     * @param {*} key
     */
    rightTyping(key) {
        this.alreadyType += key;
        this.rightTypeCount++;
        AudioUsedRegularly.playAudioCorrectType();
        this.window.showWindow({already:this.alreadyType, yet:this.hiraganaToAlphabet.romajiChangeListHead()});
        if(this.hiraganaToAlphabet.isFinished()) {
            this.changeText();
            this.attack();
            if(this.enemy.hp() == 0) { this.showFinish(); }
        }
    }

    /**
     * ミスタイプをした時の処理
     */
    missTyping() {
        this.missTypeCount++;
        this.character.downAttack();
        AudioUsedRegularly.playAudioMissType();
    }

    /**
     * ウィンドウを表示する
     */
    async showWindow() {
        await this.startCountDown();
        await this.gameCountDown();
        this.start = false;
        if(!this.finish) {
            this.finish = true;
            this.window = new ResultWindow(this.rightTypeCount, this.missTypeCount);
            this.window.showWindow();
        }
    }

    /**
     * スタートのカウントダウン
     */
    async startCountDown() {
        this.window.showCountDown(3);
        AudioUsedRegularly.playAudio3();
        await sleep(1000);
        this.window.showCountDown(2);
        AudioUsedRegularly.playAudio2();
        await sleep(1000);
        this.window.showCountDown(1);
        AudioUsedRegularly.playAudio1();
        await sleep(1000);
        this.start = true;
        this.window.showWindow();
        this.changeText();
        this.window.showWindow({correct:this.rightTypeCount, miss:this.missTypeCount});
        AudioUsedRegularly.playAudioStart();

        return new Promise(resolve => resolve());
    }

    /**
     * 終了後の表示を行う
     */
    showFinish() {
        this.finish = true;
        this.window = new ResultWindow(this.rightTypeCount, this.missTypeCount);
        this.window.showWindow();
    }
}

/**
 * ゲームの待機画面を作成する
 */
class SinglePlayWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
        this.already = "";
        this.yet = "";
        this.kanjiText = "";
        this.correct = 0;
        this.miss = 0;
        this.time = 0;
    }

    /**
     * ページを表示する
     */
     showWindow({already, yet, kanjiText, miss, time, correct}={}) {
        if(already != undefined) { this.already = already; }
        if(yet != undefined) { this.yet = yet; }
        if(kanjiText != undefined) { this.kanjiText = kanjiText; }
        if(miss != undefined) { this.miss = miss; }
        if(time != undefined) { this.time = time; }
        if(correct != undefined) { this.correct = correct; }

        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showMyCharacter();
        this.showKanjiText();
        this.showRomaji();
        this.showTimerCountDown();
        this.showCorrectAndMissCount();
        this.showEnemyHp();
    }

    /**
     * イメージを表示する
     */
    imageLoad() {
        super.imageLoad();
        this.clock = Images.getImage("clock");
    }

    /**
    * 平仮名文字列を表示する
    */
    showKanjiText() {
        this.ctx.font = FontUsedReguraly.osakaMono(TextSizeUsedReguraly.NOMAL);
        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        const textWidth = this.ctx.measureText( this.kanjiText ).width;
        const height = 275;

        this.ctx.fillText(this.kanjiText, (this.canvas.width - textWidth) / 2, height);
    }

    /**
     * ローマ字を表示する
     * @param {*} str
     */
    showRomaji() {
        const fontSize = TextSizeUsedReguraly.MINI;
        this.ctx.font = FontUsedReguraly.osakaMono(fontSize);
        const textWidth = this.ctx.measureText( this.already + this.yet ).width;
        const start = (this.canvas.width - textWidth) / 2;
        const height = 240;

        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;
        this.ctx.fillText(this.already, start, height);

        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        this.ctx.fillText(this.yet, start + this.already.length*fontSize / 2, height);
    }

    /**
     * カウントダウンを表示する
     * @param {*} number
     */
    showCountDown(number) {
        this.canvasClear();
        this.showBackGround();
        this.showCount(number);
        this.showFrame();
    }

    /**
     * カウントダウンを表示する
     * @param {*} number
     */
    showCount(number) {
        this.ctx.drawImage(Images.getImage("count"+number.toString()), 0, 0);
    }

    /**
     * 時間のカウントダウンを表示する
     */
    showTimerCountDown() {
        const fontSize = TextSizeUsedReguraly.BIG;
        const time = this.time.toString();
        this.ctx.font = FontUsedReguraly.osakaMono(fontSize);
        let textWidth = this.ctx.measureText( time ).width;
        let height = 80;

        this.ctx.drawImage(this.clock, 30, 14);
        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;
        this.ctx.fillText(time, 80-textWidth/2, height);
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount() {
        const fontSize = TextSizeUsedReguraly.BIG;
        const text = "正しい入力: "+ this.correct.toString() + "  間違えた入力: " + this.miss.toString();

        this.ctx.font = FontUsedReguraly.osakaMono(fontSize);
        let textWidth = this.ctx.measureText( text ).width;
        let height = 450;
        let start = (this.canvas.width - textWidth) / 2;

        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;
        this.ctx.fillText(text, start, height);
    }

    /**
     * 自分のキャラクターを表示する
     */
    showMyCharacter() {
        const startW = 20;
        const startH = 80;
        this.ctx.drawImage(this.character.getImageSmall(), startW, startH);
    }

    /**
     * 敵のhpを表示する
     */
    showEnemyHp() {
        const startH = 40;
        const startW = 260;
        const width = 500;
        const height = 10;

        this.ctx.fillStyle = ColorUsedReguraly.HP_BAR;
        const remainHp = width*(1.0 - this.enemy.hpPercent());
        this.ctx.fillRect(startW + remainHp, startH, width-remainHp, height);
    }

    /**
     * 敵を設定する
     * @param {Enemy} enemy 敵
     */
    setEnemy(enemy) {
        this.enemy = enemy;
    }

    /**
     * キャラクターを設定する
     * @param {CharacterStatus} キャラクター
     */
    setCharacter(character) {
        this.character = character;
    }
}

/**
 * 結果を表示するページ
 */
class ResultWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor(correct, miss) {
        super();
        this.correct = correct.toString();
        this.miss = miss.toString();
        this.imageLoad();
    }

    /**
     * 画像を読み込む
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns 先に進むページ
     */
    onClick(x, y) {
        super.mouseUp(x, y);
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return MovePage.BEHIND_PAGE;
        }
        this.showWindow();
        return MovePage.CURRENT_PAGE;
    }

    /**
     * 結果を表示する
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showResult();
        this.showCorrectAndMissCount();
        this.showUndo();
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount() {
        let fontSize = 32;
        let text = "正しい入力: "+ this.correct + "  間違えた入力: " + this.miss;

        this.ctx.font = fontSize.toString() + "px ヒラギノ丸ゴ Pro W4";
        let textWidth = this.ctx.measureText( text ).width;
        let height = 450;
        let start = (this.canvas.width - textWidth) / 2;

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(text, start, height);
    }

    /**
     * 結果画像を表示する
     */
    showResult() {
        this.ctx.drawImage(Images.getImage("resultPage"), 0, 0);
    }
}
