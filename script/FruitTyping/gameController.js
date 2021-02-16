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
    static nickName = 3;
    static setting = 4;
    static single = 5;
    static title = 6;

    /**
     * コンストラクタ
     */
    constructor() {
        // ここに画面をすべて始めに読み込んでおくように変更する
        AudioUsedRegularly.playAudioBGM();
    }

    makeEachWindow() {
        this.titlePage = new TitlePage();
        this.settingPage = new SettingPage();
        this.aikotobaPage = new AikotobaPage();
        this.characterChoosePage = new CharacterChoosePage();
        this.nickNamePage = new NickNamePage();
        this.character = undefined;
    }

    /**
     * keyDownを取得する
     * @param {*} event
     */
    keyDown(event) {
        switch (this.page) {
            case GameController.single:
                this.doSinglePlay(event.key);
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
        }
    }

    /**
     * クリック処理があった時
     * @param {*} event
     */
    onClick(event) {
        switch(this.page) {
            case GameController.title:
                this.onClickTitlePage(event.x, event.y);
                break;
            case GameController.nickName:
                this.onClickNickNamePage(event.x, event.y);
                break;
            case GameController.setting:
                this.onClickSettingPage(event.x, event.y);
                break;
            case GameController.aikotoba:
                this.onClickAikotobaPage(event.x, event.y);
                break;
            case GameController.battle:
                this.onClickMultiPlayPage(event.x, event.y);
                break;
            case GameController.characterChoose:
                this.onClickCharacterChoosePage(event.x, event.y);
                break;
        }
    }

    /**
     * 合言葉ページでの処理
     * @param {*} key
     */
    doAikotobaPage(key) {
        this.aikotobaPage.inputKeyDown(key);
    }

    /**
     * バトルページでの処理
     * @param {*} key
     */
    doBattlePage(key) {
        if(!this.battlePage.isFinished()) {
            this.battlePage.inputKeyDown(key);
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
        this.nickNamePage.inputKeyDown(key);
    }

    /**
     * ゲームが始まっている時にキーボードの入力を受けた際の処理
     * @param {*} key
     */
    doSinglePlay(key) {
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
                this.moveToTitlePage();
            }
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
     * バトルページに移動
     */
    moveToBattlePage() {
        this.page = GameController.battle;
        this.battlePage = new BattlePage(this.aikotoba, this.nickName, this.character);
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
     * 合言葉ページでの処理
     * @param {*} x
     * @param {*} y
     */
    onClickAikotobaPage(x, y) {
        let movePage = this.aikotobaPage.onClick(x, y);

        switch(movePage) {
            case GameController.characterChoose:
                this.moveToCharacterChoosePage();
                break;
            case GameController.battle:
                this.aikotoba = this.aikotobaPage.getAikotoba();
                this.moveToBattlePage();
                break;
        }
    }

    /**
     * キャラクター選択画面の処理
     * @param {*} x
     * @param {*} y
     */
    onClickCharacterChoosePage(x, y) {
        let movePage = this.characterChoosePage.onClick(x, y);

        switch(movePage) {
            case GameController.aikotoba:
                this.character = this.characterChoosePage.getCharacterId();
                this.moveToAikotobaPage();
                break;
            case GameController.nickName:
                this.moveToNickNamePage();
                break;
        }
    }

    /**
     * マルチプレイゲームでの処理
     * @param {*} x
     * @param {*} y
     */
    onClickMultiPlayPage(x, y) {
        let movePage = this.battlePage.onClick(x, y);

        switch(movePage) {
            case GameController.aikotoba:
                this.battlePage.ws.close();
                delete this.battlePage;
                this.moveToAikotobaPage();
                break;
        }
    }

    /**
     * ニックネームページの処理
     * @param {*} x
     * @param {*} y
     */
    onClickNickNamePage(x, y) {
        let movePage = this.nickNamePage.onClick(x, y);

        switch(movePage) {
            case GameController.title:
                this.moveToTitlePage();
                break;
            case GameController.characterChoose:
                this.nickName = this.nickNamePage.getNickName();
                this.moveToCharacterChoosePage();
                break;
        }
    }

    /**
     * 設定ページの処理
     * @param {*} x
     * @param {*} y
     */
    onClickSettingPage(x, y) {
        let movePage = this.settingPage.onClick(x, y);

        switch(movePage) {
            case GameController.title:
                this.moveToTitlePage();
                break;
        }
    }

    /**
     * タイトルページの処理
     * @param {*} x
     * @param {*} y
     */
    onClickTitlePage(x, y) {
        let movePage = this.titlePage.onClick(x, y);

        switch(movePage) {
            case GameController.single:
                this.page = GameController.single;
                this.typingGame = new TypingGame();
                break;
            case GameController.nickName:
                this.moveToNickNamePage();
                break;
            case GameController.setting:
                this.moveToSettingPage();
                break;
        }
    }
}

function firstload() {
    let gameController = new GameController();
    loadAllImages(gameController);
}
