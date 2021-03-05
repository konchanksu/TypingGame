/**
 * キーボードゲームを開始するクラス
 */
class GameController {
    /**
     * タイトルページの番号
     */
    static AIKOTOBA = 0;
    static BATTLE = 1;
    static CHARACTER_CHOOSE = 2;
    static NICKNAME = 3;
    static SETTING = 4;
    static SINGLE = 5;
    static SINGLE_WAIT = 6;
    static TITLE = 7;
    static MULTI_WAIT = 8;
    static SINGLE_CHARACTER_CHOOSE = 9;

    /**
     * コンストラクタ
     */
    constructor() {
        // AudioUsedRegularly.playAudioBGM();
    }

    makeEachWindow() {
        this.titlePage = new TitlePage();
        this.settingPage = new SettingPage();
        this.aikotobaPage = new AikotobaPage();
        this.characterChoosePage = new CharacterChoosePage();
        this.nickNamePage = new NickNamePage();
        this.singleWaitPage = new SingleWaitPage();
    }

    /**
     * keyDownを取得する
     * @param {*} event
     */
    keyDown(event) {
        const key = event.key;
        switch (this.page) {
            case GameController.SINGLE:
                this.singlePlayPage.keyDown(key);
                break;
            case GameController.AIKOTOBA:
                this.aikotobaPage.inputKeyDown(key);
                break;
            case GameController.NICKNAME:
                this.nickNamePage.inputKeyDown(key);
                break;
            case GameController.BATTLE:
                this.doBattlePage(key);
                break;
        }
    }

    /**
     * クリック処理があった時
     * @param {*} event
     */
    onClick(event) {
        const x = event.x;
        const y = event.y;
        switch(this.page) {
            case GameController.TITLE:
                this.onClickTitlePage(x, y);
                break;
            case GameController.NICKNAME:
                this.onClickNickNamePage(x, y);
                break;
            case GameController.SETTING:
                this.onClickSettingPage(x, y);
                break;
            case GameController.AIKOTOBA:
                this.onClickAikotobaPage(x, y);
                break;
            case GameController.CHARACTER_CHOOSE:
                this.onClickCharacterChoosePage(x, y);
                break;
            case GameController.SINGLE_WAIT:
                this.onClickSingleWaitPage(x, y);
                break;
            case GameController.SINGLE:
                this.onClickSinglePlayPage(x, y);
                break;
            case GameController.BATTLE:
                this.onClickMultiPlayPage(x, y);
                break;
            case GameController.SINGLE_CHARACTER_CHOOSE:
                this.onClickSingleCharacterChoosePage(x, y);
                break;
        }
    }

    /**
     * マウスダウンの処理
     * @param {*} event
     */
    mouseDown(event) {
        const x = event.x;
        const y = event.y;
        switch(this.page) {
            case GameController.TITLE:
                this.titlePage.mouseDown(x, y);
                break;
            case GameController.SETTING:
                this.settingPage.mouseDown(x, y);
                break;
            case GameController.NICKNAME:
                this.nickNamePage.mouseDown(x, y);
                break;
            case GameController.CHARACTER_CHOOSE:
                this.characterChoosePage.mouseDown(x, y);
                break;
            case GameController.AIKOTOBA:
                this.aikotobaPage.mouseDown(x, y);
                break;
            case GameController.BATTLE:
                this.battlePage.mouseDown(x, y);
                break;
            case GameController.SINGLE_WAIT:
                this.singleWaitPage.mouseDown(x, y);
                break;
            case GameController.SINGLE:
                this.singlePlayPage.mouseDown(x, y);
                break;
            case GameController.SINGLE_CHARACTER_CHOOSE:
                this.characterChoosePage.mouseDown(x, y);
                break;
        }
    }

    /**
     * ホバーの処理
     * @param {*} event
     */
    mouseMove(event) {
        const x = event.x;
        const y = event.y;
        switch(this.page) {
            case GameController.TITLE:
                this.titlePage.mouseMove(x, y);
                break;
            case GameController.SETTING:
                this.settingPage.mouseMove(x, y);
                break;
            case GameController.NICKNAME:
                this.nickNamePage.mouseMove(x, y);
                break;
            case GameController.CHARACTER_CHOOSE:
                this.characterChoosePage.mouseMove(x, y);
                break;
            case GameController.AIKOTOBA:
                this.aikotobaPage.mouseMove(x, y);
                break;
            case GameController.BATTLE:
                this.battlePage.mouseMove(x, y);
                break;
            case GameController.SINGLE_WAIT:
                this.singleWaitPage.mouseMove(x, y);
                break;
            case GameController.SINGLE:
                this.singlePlayPage.mouseMove(x, y);
                break;
            case GameController.SINGLE_CHARACTER_CHOOSE:
                this.characterChoosePage.mouseMove(x, y);
                break;
        }
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
     * 合言葉画面に移動
     */
    moveToAikotobaPage() {
        this.page = GameController.AIKOTOBA;
        this.aikotobaPage.showWindow();
    }

    /**
     * バトルページに移動
     */
    moveToBattlePage() {
        this.page = GameController.BATTLE;
        this.battlePage = new BattlePage(this.aikotoba, this.nickName, this.character);
    }

    /**
     * キャラクター選択画面に移動
     */
    moveToCharacterChoosePage() {
        this.page = GameController.CHARACTER_CHOOSE;
        this.characterChoosePage.showWindow();
    }

    /**
     * ニックネーム入力画面に移動
     */
    moveToNickNamePage() {
        this.page = GameController.NICKNAME;
        this.nickNamePage.showWindow();
    }

    /**
     * 設定画面に移動
     */
    moveToSettingPage() {
        this.page = GameController.SETTING;
        this.settingPage.showWindow();
    }

    /**
     * 人利用キャラクター選択画面に移動
     */
    moveToSingleCharacterChoose() {
        this.page = GameController.SINGLE_CHARACTER_CHOOSE;
        this.characterChoosePage.showWindow();
    }

    /**
     * シングルプレイページに移動
     */
    moveToSinglePlayPage() {
        this.page = GameController.SINGLE;
        this.singlePlayPage = new SinglePlayPage();
        this.singlePlayPage.showWindow();
    }

    /**
     * シングルプレイページに移動
     */
    moveToSingleWaitPage() {
        this.page = GameController.SINGLE_WAIT;
        this.singleWaitPage.showWindow();
    }

    /**
     * タイトル画面に移動
     */
    moveToTitlePage() {
        this.page = GameController.TITLE;
        this.character = undefined;
        this.titlePage.canClick();
        this.titlePage.showWindow();
    }

    /**
     * 合言葉ページでの処理
     * @param {*} x
     * @param {*} y
     */
    onClickAikotobaPage(x, y) {
        const movePage = this.aikotobaPage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
                this.moveToCharacterChoosePage();
                break;
            case MovePage.AHEAD_PAGE:
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
        const movePage = this.characterChoosePage.onClick(x, y);
        Promise.resolve(movePage).then(resolve => {
            switch(resolve) {
                case MovePage.AHEAD_PAGE:
                    this.character = this.characterChoosePage.getCharacterId();
                    this.moveToAikotobaPage();
                    break;
                case MovePage.BEHIND_PAGE:
                    this.moveToNickNamePage();
                    break;
            }
        });
    }

    /**
     * マルチプレイゲームでの処理
     * @param {*} x
     * @param {*} y
     */
    onClickMultiPlayPage(x, y) {
        const movePage = this.battlePage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
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
        const movePage = this.nickNamePage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
                this.moveToTitlePage();
                break;
            case MovePage.AHEAD_PAGE:
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
        const movePage = this.settingPage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
                this.moveToTitlePage();
                break;
        }
    }

    /**
     * シングルページでキャラクター選択画面でのキャラクター表示
     * @param {*} x
     * @param {*} y
     */
    onClickSingleCharacterChoosePage(x, y) {
        const movePage = this.characterChoosePage.onClick(x, y);

        Promise.resolve(movePage).then(resolve => {
            switch(resolve) {
                case MovePage.BEHIND_PAGE:
                    this.moveToTitlePage();
                    break;
                case MovePage.AHEAD_PAGE:
                    this.character = this.characterChoosePage.getCharacterId();
                    this.moveToSingleWaitPage();
                    break;
            }
        });
    }

    /**
     * シングルプレイ待機ページでクリック処理
     * @param {*} x
     * @param {*} y
     */
    onClickSingleWaitPage(x, y) {
        const movePage = this.singleWaitPage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
                this.moveToTitlePage();
                break;
            case MovePage.AHEAD_PAGE:
                this.moveToSinglePlayPage();
                break;
        }
    }

    /**
     * シングルプレイページでクリック処理
     * @param {*} x
     * @param {*} y
     */
    onClickSinglePlayPage(x, y) {
        const movePage = this.singlePlayPage.onClick(x, y);

        switch(movePage) {
            case MovePage.BEHIND_PAGE:
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
        const movePage = this.titlePage.onClick(x, y);
        Promise.resolve(movePage).then(resolve => {
            switch(resolve) {
                case GameController.SINGLE_CHARACTER_CHOOSE:
                    this.moveToSingleCharacterChoose();
                    break;
                case GameController.NICKNAME:
                    this.moveToNickNamePage();
                    break;
                case GameController.SETTING:
                    this.moveToSettingPage();
                    break;
            };
        });
    }
}

function firstload() {
    itemSet();
    const gameController = new GameController();
    loadAllImages(gameController);
}
