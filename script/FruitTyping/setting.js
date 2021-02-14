/**
 * 設定を表示するページ
 */
class SettingPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new SettingWindow();
    }

    /**
     * セッティング画面を表示する
     */
    showWindow() {
        this.window.canvasClear();
        this.window.showFrame();
        this.window.showUndo();
        this.window.showSlideBarSE();
        this.window.showSlideBarBGM();
    }

    inputKeyDown(key) {

    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        return this.window.onClick(x, y);
    }
}

/**
 * 設定のウィンドウの表示
 */
class SettingWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
    }

    /**
     * クリックできなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
        this.slideBarSE.setAbleClick(false);
        this.slideBarBGM.setAbleClick(false);
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.slideBarSE = new SlideButtonOnCanvas(300, 600, 400, AudioOnWeb.nowSEVolume, "se", (event) => {
            AudioOnWeb.setSEVolume(event.detail);
        });
        this.slideBarBGM = new SlideButtonOnCanvas(300, 600, 300, AudioOnWeb.nowBGMVolume, "bgm", (event) => {
            AudioOnWeb.setBGMVolume(event.detail);
        });
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.title;
        }
        return -1;
    }

    /**
     * スライドバーを表示
     */
    showSlideBarSE() {
        this.slideBarSE.showSlideButton();
    }

    /**
     * BGMをいじるスライドバーを表示
     */
    showSlideBarBGM() {
        this.slideBarBGM.showSlideButton();
    }
}
