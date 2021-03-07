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
        this.already = "";  // すでに入力した文字列
        this.yet = "";  // まだ入力していない文字列
        this.kanjiText = "";  // タイピングされる文字列
        this.correct = 0;  // 正しく入力した回数
        this.miss = 0;  // 誤って入力した回数
        this.time = 0;  // 残り時間
        this.charaWidth = 20;  // キャラクター表示の横座標
        this.charaHeight = 80;  // キャラクター表示の縦座標
        this.isFinish = false;  // このページが終了しているかどうか
    }

    /**
     * このウィンドウの表示を終了するフラグを立てる
     */
    finish() {
        this.isFinish = true;
    }

    /**
     * 画像データを読み込む
     */
    imageLoad() {
        super.imageLoad();
        this.clock = Images.getImage("clock");
    }

    /**
     * 小さいジャンプのアニメーションを表示する
     */
    async minijumpAnimation() {
        const max = 8;
        const waitTime = 30;
        const high = 25;

        const movePosition = upAndDownAnimation(max, this.charaHeight, this.charaHeight - high);
        for(const value of movePosition) {
            await sleep(waitTime);
            this.charaHeight = value;
            if(!this.isFinish) { this.showWindow(); }
            else { return; }
        }

        return new Promise(resolve => resolve());
    }

    /**
     * キャラクターを設定する
     * @param {CharacterStatus} キャラクター
     */
    setCharacter(character) {
        this.character = character;
    }

    /**
     * 敵を設定する
     * @param {Enemy} enemy 敵
     */
    setEnemy(enemy) {
        this.enemy = enemy;
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount() {
        const fontSize = TextSizeUsedReguraly.NORMAL;
        const text = "正しい入力: "+ this.correct.toString() + "  間違えた入力: " + this.miss.toString();

        this.ctx.font = FontUsedReguraly.monoSpace(fontSize);
        const textWidth = this.ctx.measureText( text ).width;
        const height = 450;
        const start = (this.canvas.width - textWidth) / 2;

        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;
        this.ctx.fillText(text, start, height);
    }

    /**
     * カウントダウンを表示する
     * @param {Integer} number
     */
    showCount(number) {
        this.ctx.drawImage(Images.getImage("count"+number.toString()), 0, 0);
    }

    /**
     * カウントダウンを表示する
     * @param {Integer} number
     */
    showCountDown(number) {
        this.canvasClear();
        this.showBackGround();
        this.showCount(number);
        this.showFrame();
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
     * 平仮名文字列を表示する
     */
    showKanjiText() {
        this.ctx.font = FontUsedReguraly.monoSpace(TextSizeUsedReguraly.NORMAL);
        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        const textWidth = this.ctx.measureText( this.kanjiText ).width;
        const height = 275;

        this.ctx.fillText(this.kanjiText, (this.canvas.width - textWidth) / 2, height);
    }

    /**
     * 自分のキャラクターを表示する
     */
    showMyCharacter() {
        this.ctx.drawImage(this.character.getImageSmall(), this.charaWidth, this.charaHeight);
    }

    /**
     * ローマ字を表示する
     */
    showRomaji() {
        this.ctx.font = FontUsedReguraly.monoSpace(TextSizeUsedReguraly.MINI);
        const textWidth = this.ctx.measureText( this.already + this.yet ).width;
        const start = (this.canvas.width - textWidth) / 2;
        const alreadyWidth = this.ctx.measureText( this.already ).width;
        const height = 240;

        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;
        this.ctx.fillText(this.already, start, height);

        this.ctx.fillStyle = ColorUsedReguraly.TEXT_COLOR;
        this.ctx.fillText(this.yet, start + alreadyWidth, height);
    }

    /**
     * 時間のカウントダウンを表示する
     */
    showTimerCountDown() {
        const fontSize = TextSizeUsedReguraly.NORMAL;
        const time = this.time.toString();

        this.ctx.font = FontUsedReguraly.monoSpace(fontSize);
        this.ctx.fillStyle = ColorUsedReguraly.GAME_ORANGE;

        const textWidth = this.ctx.measureText( time ).width;
        const height = 80;
        const width = 80;

        const clockWidth = 30;
        const clockHeight = 14;

        this.ctx.drawImage(this.clock, clockWidth, clockHeight);
        this.ctx.fillText(time, width-textWidth/2, height);
    }

    /**
     * このページを表示する
     * @param {String} already すでに入力した文字列
     * @param {String} yet まだ入力していない文字列
     * @param {String} kanjiText タイピングされる文字列
     * @param {Integer} miss 誤って入力した回数
     * @param {Integer} time 残り時間
     * @param {Integer} correct 正しく入力した回数
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
     * ウィンドウを表示可能にする
     */
    start() {
        this.isFinish = false;
    }
}
