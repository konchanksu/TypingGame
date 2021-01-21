/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static title = 0;
    static game = 1;

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
     * クリックがあった時の処理
     */
    onClick(event) {
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        if(this.page == GameController.title) {
            if(this.titlePage.onButtonClick(x, y)) {
                this.page = GameController.game;
                this.typingGame = new TypingGame();
            }
        }
    }

    /**
     * keyDownを取得する
     * @param {*} event
     */
    keyDown(event) {
        if(this.page == GameController.game) {
            this.gamePlay(event);
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
    canvas.addEventListener("click", event => { gameController.onClick(event) }, false);
}
