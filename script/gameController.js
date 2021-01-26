/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static title = 0;
    static game = 1;
    static nickName = 2;
    static aikotoba = 3;
    static battle = 4;

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
        // 一人対戦ページのキーダウンの処理
        if(this.page == GameController.game) {
            this.gamePlay(event);
        }

        // タイトルページのキーダウン処理
        else if(this.page == GameController.title) {
            let movePage = this.titlePage.inputKeyDown(event.key);

            // 一人ゲームに移動
            if(movePage == 0) {
                this.page = GameController.game;
                this.typingGame = new TypingGame();
            }

            // マルチプレイに移動
            else if(movePage == 1) {
                this.page = GameController.nickName;
                this.nickNamePage = new NickNamePage();
            }
        }

        // キーボードの押下のページ
        else if(this.page == GameController.nickName) {
            this.nickName = this.nickNamePage.inputKeyDown(event.key);
            if(this.nickName != "") {
                this.page = GameController.aikotoba;
                this.aikotobaPage = new AikotobaPage();
            }
        }

        // 合言葉入力ページ
        else if(this.page == GameController.aikotoba) {
            this.aikotoba = this.aikotobaPage.inputKeyDown(event.key);
            if(this.aikotoba != "") {
                this.page = GameController.battle;
                this.battlePage = new BattlePage(this.aikotoba, this.nickName);
            }
        }

        // バトルページ
        else if(this.page == GameController.battle) {
            if(!this.battlePage.isFinished()) {
                this.battlePage.inputKeyDown(event.key);
            } else {
                if(this.battlePage.inputKeyDownFinished(event.key)) {
                    this.page = GameController.title;
                    delete this.battlePage;
                }
            }
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
