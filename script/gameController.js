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
        // ここに画面をすべて始めに読み込んでおくように変更する
        this.titlePage = new TitlePage();
        this.nickNamePage = new NickNamePage();
        this.aikotobaPage = new AikotobaPage();
        const chara = new Image();
        const ch = new Image();
        ch.src = "/static/img/frame.png";
        chara.src = "/static/img/pekora.png";
        chara.onload = () => {
            this.moveToTitlePage();
        }
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
                this.nickNamePage.showNickNameWindow();
            }
        }

        // ニックネーム入力ページ
        else if(this.page == GameController.nickName) {
            this.nickName = this.nickNamePage.inputKeyDown(event.key);
            if(this.nickName != "") {
                this.page = GameController.aikotoba;
                this.aikotobaPage.showAikotobaWindow();
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
            // 終了前
            if(!this.battlePage.isFinished()) {
                if(this.battlePage.inputKeyDown(event.key)) {
                    this.moveToTitlePage();
                    delete this.battlePage;
                }
            }
            // 終了後
            else {
                if(this.battlePage.inputKeyDownFinished(event.key)) {
                    this.moveToTitlePage();
                    delete this.battlePage;
                }
            }
        }
    }

    /**
     * タイトル画面に移動
     */
    moveToTitlePage() {
        this.page = GameController.title;
        this.titlePage.showTitleWindow();
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
