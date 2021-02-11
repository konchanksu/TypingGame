/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static aikotoba = 0;
    static battle = 1;
    static characterChoose = 2;
    static game = 3;
    static nickName = 4;
    static setting = 5;
    static title = 6;

    /**
     * コンストラクタ
     */
    constructor() {
        // ここに画面をすべて始めに読み込んでおくように変更する
        this.aikotobaPage = new AikotobaPage();
        this.characterChoosePage = new CharacterChoosePage();
        this.nickNamePage = new NickNamePage();
        this.settingPage = new SettingPage();
        this.titlePage = new TitlePage();

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
        switch (this.page) {
            case GameController.game:
                this.gamePlay(event);
                break;
            case GameController.setting:
                this.doSettingPage(event.key);
                break;
            case GameController.aikotoba:
                this.doAikotobaPage(event.key);
                break;
            case GameController.nickName:
                this.doNicknamePage(event.key);
                break;
            case GameController.battle:
                this.doBattlePage(event.key);
                break;
            case GameController.title:
                this.doTitlePage(event.key);
                break;
        }
    }

    /**
     * 合言葉ページでの処理
     * @param {*} key
     */
    doAikotobaPage(key) {
        if(key == "Escape") {
            this.moveToNickNamePage();
        }
        else {
            this.aikotoba = this.aikotobaPage.inputKeyDown(key);
            if(this.aikotoba != "") {
                this.page = GameController.battle;
                let character = 2;
                this.battlePage = new BattlePage(this.aikotoba, this.nickName, character);
            }
        }
    }

    /**
     * バトルページでの処理
     * @param {*} key
     */
    doBattlePage(key) {
        // 終了前
        if(!this.battlePage.isFinished()) {
            if(this.battlePage.inputKeyDown(key)) {
                this.moveToAikotobaPage();
                this.battlePage.ws.close();
                delete this.battlePage;
            }
        }
        // 終了後
        else {
            if(this.battlePage.inputKeyDownFinished(key)) {
                this.moveToTitlePage();
                this.battlePage.ws.close();
                delete this.battlePage;
            }
        }
    }

    /**
     * ニックネームページでの処理
     * @param {*} key
     */
    doNicknamePage(key) {
        if(key == "Escape") {
            this.moveToTitlePage();
        }
        else {
            this.nickName = this.nickNamePage.inputKeyDown(key);
            if(this.nickName != "") {
                this.moveToAikotobaPage();
            }
        }
    }

    /**
     * 設定ページでの処理
     * @param {*} key
     */
    doSettingPage(key) {
        if(key == "Escape") {
            this.moveToTitlePage();
        } else {
            this.settingPage.inputKeyDown(key);
        }
    }

    /**
     * タイトルページの処理
     * @param {*} key
     */
    doTitlePage(key) {
        let movePage = this.titlePage.inputKeyDown(key);

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

    /**
     * 合言葉画面に移動
     */
    moveToAikotobaPage() {
        this.page = GameController.aikotoba;
        this.aikotobaPage.showWindow();
    }

    /**
     * キャラクター選択画面に移動
     */
    moveToCharacterChoosePage() {
        this.page = GameController.characterChoose;
        this.characterChoosePage.showWindow();
    }

    /**
     * ニックネーム入力画面に移動
     */
    moveToNickNamePage() {
        this.page = GameController.nickName;
        this.nickNamePage.showWindow();
    }

    /**
     * 設定画面に移動
     */
    moveToSettingPage() {
        this.page = GameController.setting;
        this.settingPage.showWindow();
    }

    /**
     * タイトル画面に移動
     */
    moveToTitlePage() {
        this.page = GameController.title;
        this.titlePage.showWindow();
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
