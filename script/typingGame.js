/**
 * タイピングゲームを管理するクラス
 */
class TypingGame {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new ShowWindow();
        this.hiraganaToAlphabet = new HiraganaToAlphabet("");
        this.gameReset();
    }

    /**
     * ゲームをクリアした時に表示するクラス
     */
    gameClear() {
        let endGameTime = Date.now();
        let diffarence = endGameTime - this.startGameTime;
        let score = (this.correctTyping - this.missTyping) * 100000 / diffarence;
        this.gameReset();
        this.window.canvasClear();
        this.window.showMainMenu(
            "Game Clear　Time:" +
            diffarence.toString().slice(0, -3) +
            "秒" +
            diffarence.toString().slice(-3) +
            "　スコア" +
            parseInt(score, 10).toString()
        );
        this.window.showSubMenu("スペースでもう一度");
    }

    /**
     * ゲーム中の画面をディスプレイに表示する
     */
    gameContentsOnDisplay() {
        this.window.canvasClear();
        this.window.showMainMenu(this.nowStringItem.kanji_data);
        this.window.showAlreadyWindow(this.typeKey);
        this.window.showYetWindow(this.hiraganaToAlphabet.romajiChangeListHead(), this.typeKey.length);
        this.window.showSubMenu(
            "入力した数:" +
            (this.correctTyping + this.missTyping).toString() +
            "  正しい入力:" +
            this.correctTyping.toString() +
            "  誤った入力:" +
            this.missTyping.toString()
        );
    }

    /**
     * ゲームを開始するクラス
     */
    gameStart() {
        this.startGameTime = Date.now();
        this.nextString();
    }

    /**
     * ゲームをPlay前の状態に戻す
     */
    gameReset() {
        this.correctTyping = 0;
        this.missTyping = 0;
        this.remainNum = 4;
        this.hiraganaToAlphabet.newTextSet("");
        this.typeKey = "";
        Database.resetRandomItemList();
        this.window.canvasClear();
        this.window.showMainMenu("スペースキーでゲームスタート");
        this.window.showAlreadyWindow("");
        this.window.showYetWindow("", 0);
        this.window.showSubMenu("");
    }

    /**
     * ゲーム中にキー入力があった時に動作するクラス
     */
    inputKey(key) {
        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            this.onGameCorrectTyping(key);
        } else {
            this.onGameMissTyping();
        }
    }

    /**
     * ゲームが終了したかどうかを判定する
     * @return { Boolean } ゲームが終了したかどうか
     */
    isFinished() {
        if(this.hiraganaToAlphabet.isFinished()) {
            this.remainNum -= 1;
            if(this.remainNum == 0) { return true; }
            this.nextString();
        }
        return false;
    }

    /**
     * 新たな文字を出現させる
     */
    nextString() {
        this.nowStringItem = Database.randomGet();
        this.hiraganaToAlphabet.newTextSet(this.nowStringItem.hiragana_data);
        this.typeKey = "";
        this.gameContentsOnDisplay();
    }

    /**
     * ゲーム中に正しいタイプが発生した時の動作
     * @param {String} key 入力したキー
     */
    onGameCorrectTyping(key) {
        this.correctTyping += 1;
        this.typeKey += key;
        this.gameContentsOnDisplay();
    }

    /**
     * ゲーム中にミスタイプが発生した時の動作
     */
    onGameMissTyping() {
        this.missTyping += 1;
        this.gameContentsOnDisplay();
    }
}

/**
 * ウィンドウ表示について行うクラス
 */
class ShowWindow {
    /**
     * コンストラクタ
     */
    constructor (){
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "24px osaka-mono"
        this.ctx.textAlign = "left";
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 文字列をid romajiに表示させる
     * @param {*} str
     */
    showAlreadyWindow(str) {
        this.ctx.fillStyle = "gray";
        this.ctx.fillText(str, 0, 100);
        this.ctx.fillStyle = "black";
    }

    /**
    * 文字列をid frameに表示させる
    * @param {String} str 表示させる文字列
    */
    showMainMenu(str) {
        this.ctx.fillText(str, 0, 30);
    }

    /**
    * ゲームのサブメニューを表示する
    * @param {String} str 表示させる文字列
    */
    showSubMenu(str) {
        this.ctx.fillText(str, 0, 200);
    }

    /**
     * 文字列をid romajiに表示させる
     * @param {*} str
     * @param {Integer} start 既に入力された文字数
     */
    showYetWindow(str, start) {
        this.ctx.fillText(str, start*12, 100);
    }
}
