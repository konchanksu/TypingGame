class SinglePlayPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new SinglePlayWindow();
        this.start = false;
        this.finish = false;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet("");
        this.rightTypeCount = 0;
        this.missTypeCount = 0;
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
     * ゲームのカウントダウンを表示する
     */
    async gameCountDown() {
        for(let i = 29; i >= 0; i--) {
            this.window.showTimerCountDown(i);
            await this.sleep(1000);
            if(this.finish) { return new Promise(resolve => resolve()); }
        }

        return new Promise(resolve => resolve());
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
        if(!this.start) return;
        if(key == "Escape") { this.finish = true; return; }
        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            this.rightTyping(key);
        } else {
            this.missTyping();
        }
        this.window.showCorrectAndMissCount(this.rightTypeCount, this.missTypeCount);
    }

    /**
     * 正しい入力だった時の処理
     * @param {*} key
     */
    rightTyping(key) {
        this.alreadyType += key;
        this.window.showRomaji(this.alreadyType, this.hiraganaToAlphabet.romajiChangeListHead());
        if(this.hiraganaToAlphabet.isFinished()) {
            this.changeText();
        }
        this.rightTypeCount++;
    }

    /**
     * ミスタイプをした時の処理
     */
    missTyping() {
        this.missTypeCount++;
    }

    /**
     * スリープする
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * ウィンドウを表示する
     */
    async showWindow() {
        await this.startCountDown();
        await this.gameCountDown();
        this.start = false;
        this.finish = true;
        this.window = new ResultWindow();
        this.window.showWindow(this.rightTypeCount, this.missTypeCount);
    }

    /**
     * スタートのカウントダウン
     */
    async startCountDown() {
        this.window.showCount(3);
        await this.sleep(1000);
        this.window.showCount(2);
        await this.sleep(1000);
        this.window.showCount(1);
        await this.sleep(1000);
        this.start = true;
        this.window.showWindow();
        this.changeText();
        this.window.showCorrectAndMissCount(this.rightTypeCount, this.missTypeCount);

        return new Promise(resolve => resolve());
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
    }

    /**
     * 平仮名部分の消去
     */
    kanjiClear() {
        let width = 400;
        this.ctx.clearRect(this.canvas.width/2-width/2, 200, width, 60);
    }

    /**
     * ローマ字部分のクリア
     */
    romajiClear() {
        let width = 400;
        this.ctx.clearRect(this.canvas.width/2-width/2, 180, width, 40);
    }

    /**
     * タイマーを消去する
     */
    timerClear() {
        this.ctx.clearRect(20, 20, 50, 50);
    }

    /**
     * イメージを表示する
     */
    imageLoad() {
        super.imageLoad();
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

        this.ctx.fillText(kanjiText, (this.canvas.width - textWidth) / 2, 250);
    }

    /**
     * ページを表示する
     */
    showWindow() {
        this.canvasClear();
        this.showFrame();
    }

    /**
     * ローマ字を表示する
     * @param {*} str
     */
    showRomaji(already, yet) {
        let fontSize = 24;
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

    /**
     * カウントダウンを表示する
     * @param {*} number
     */
    showCount(number) {
        this.canvasClear();
        this.ctx.drawImage(Images.getImage("count"+number.toString()), 0, 0);
    }

    /**
     * 時間のカウントダウンを表示する
     * @param time
     */
    showTimerCountDown(time) {
        let fontSize = 32;
        time = time.toString();
        this.ctx.font = fontSize.toString() + "px ヒラギノ丸ゴ Pro W4";
        let textWidth = this.ctx.measureText( time ).width;
        let height = 45;

        this.timerClear();

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(time, 35-textWidth/2, height);
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount(correct, miss) {
        let fontSize = 32;
        let text = "正しい入力: "+ correct.toString() + "  間違えた入力: " + miss.toString();

        this.ctx.font = fontSize.toString() + "px ヒラギノ丸ゴ Pro W4";
        let textWidth = this.ctx.measureText( text ).width;
        let height = 450;
        let start = (this.canvas.width - textWidth) / 2;

        this.ctx.clearRect(50, height - 80, 700, 90);

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(text, start, height);
    }
}

/**
 * 結果を表示するページ
 */
class ResultWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
    }

    /**
     * 画像を読み込む
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * ボタンを押せなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
    }

    /**
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns 先に進むページ
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return MovePage.BEHIND_PAGE;
        }
        return MovePage.CURRENT_PAGE;
    }

    /**
     * 結果を表示する
     * @param {*} correct
     * @param {*} miss
     */
    showWindow(correct, miss) {
        this.canvasClear();
        this.showFrame();
        this.showResult();
        this.showCorrectAndMissCount(correct, miss);
        this.showUndo();
    }

    /**
     * 正しく打てた数と間違えた数を表示する
     */
    showCorrectAndMissCount(correct, miss) {
        let fontSize = 32;
        let text = "正しい入力: "+ correct.toString() + "  間違えた入力: " + miss.toString();

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
