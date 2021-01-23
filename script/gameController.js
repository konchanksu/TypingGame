/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static title = 0;
    static game = 1;
    static matchConb = 2;

    /**
     * コンストラクタ
     */
    constructor() {
        this.showTitlePage();
        this.page = GameController.title;
    }

    /**
     * 一番初めのタイトルページ
     * @param
     */
    showTitlePage() {
        this.titlePage = new TitlePage();
    }

    /**
     * keyDownを取得する
     * @param {*} event
     */
    keyDown(event) {
        // 対戦ページのキーダウンの処理
        if(this.page == GameController.game) {
            this.gamePlay(event);
        }

        // タイトルページのキーダウン処理
        if(this.page == GameController.title) {
            let movePage = this.titlePage.inputKeyDown(event.key);

            // 一人ゲームに移動
            if(movePage == 0) {
                this.page = GameController.game;
                this.typingGame = new TypingGame();
            }

            // マルチプレイに移動
            else if(movePage == 1) {
                this.page = GameController.matchConb;
                this.matchConb = new MatchCombination();
            }
        }

        // 結びつけのときの処理
        if(this.page == GameController.matchConb) {
            this.matchConb.inputKeyDown(event.key);
        }
    }

    /**
     * ゲームが始まっている時にキーボードの入力を受けた際の処理
     * @param {keyDown} event
     */
    gamePlay(event) {
        let key = event.key;
        if(this.isGameStarted) {
            if(key == "Escape") {
                this.isGameStarted = false;
                this.typingGame.gameReset();
            } else {
                this.typingGame.inputKey(key);
                if(this.typingGame.isFinished()) {
                    this.isGameStarted = false;
                    this.typingGame.gameClear();
                }
            }

        } else {
            if(key == " ") {
                this.isGameStarted = true;
                this.typingGame.gameStart();
            } else if(key == "Escape") {
                this.typingGame.gameReset();
            }
        }
    }
}

function firstload() {
    gameController = new GameController();
    canvas = document.getElementById("gameWindow");
    window.addEventListener("keydown", event => { gameController.keyDown(event) });
}
