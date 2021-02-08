/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static aikotoba = 0;
    static battle = 1;
    static game = 2;
    static nickName = 3;
    static setting = 4;
    static title = 5;

    /**
     * コンストラクタ
     */
    constructor() {
        // ここに画面をすべて始めに読み込んでおくように変更する
        this.titlePage = new TitlePage();
        this.nickNamePage = new NickNamePage();
        this.aikotobaPage = new AikotobaPage();
        this.settingPage = new SettingPage();

        const chara = new Image();
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

        // 設定ページに移動
        else if(this.page == GameController.setting) {
            if(event.key == "Escape") {
                this.moveToTitlePage();
            } else {
                this.settingPage.inputKeyDown(event.key);
            }
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
                this.moveToNickNamePage();
            }

            else if(movePage == 2) {
                this.moveToSettingPage();
            }
        }

        // ニックネーム入力ページ
        else if(this.page == GameController.nickName) {
            if(event.key == "Escape") {
                this.moveToTitlePage();
            }
            else {
                this.nickName = this.nickNamePage.inputKeyDown(event.key);
                if(this.nickName != "") {
                    this.moveToAikotobaPage();
                }
            }
        }

        // 合言葉入力ページ
        else if(this.page == GameController.aikotoba) {
            if(event.key == "Escape") {
                this.moveToNickNamePage();
            }
            else {
                this.aikotoba = this.aikotobaPage.inputKeyDown(event.key);
                if(this.aikotoba != "") {
                    this.page = GameController.battle;
                    let character = 1;
                    this.battlePage = new BattlePage(this.aikotoba, this.nickName, character);
                }
            }
        }

        // バトルページ
        else if(this.page == GameController.battle) {
            // 終了前
            if(!this.battlePage.isFinished()) {
                if(this.battlePage.inputKeyDown(event.key)) {
                    this.moveToAikotobaPage();
                    this.battlePage.ws.close();
                    delete this.battlePage;
                }
            }
            // 終了後
            else {
                if(this.battlePage.inputKeyDownFinished(event.key)) {
                    this.moveToTitlePage();
                    this.battlePage.ws.close();
                    delete this.battlePage;
                }
            }
        }
    }

    /**
     * 合言葉画面に移動
     */
    moveToAikotobaPage() {
        this.page = GameController.aikotoba;
        this.aikotobaPage.showAikotobaWindow();
    }

    /**
     * ニックネーム入力画面に移動
     */
    moveToNickNamePage() {
        this.page = GameController.nickName;
        this.nickNamePage.showNickNameWindow();
    }

    /**
     * 設定画面に移動
     */
    moveToSettingPage() {
        this.page = GameController.setting;
        this.settingPage.showSettingWindow();
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
