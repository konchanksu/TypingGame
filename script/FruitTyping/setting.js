/**
 * 設定を表示するページ
 */
class SettingPage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.window = new SettingWindow();
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
        this.center = 250;
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
        this.slideBarSE = new SlideButtonOnCanvas(this.canvas.width/2 - 50, this.canvas.width/2 + 250, 330, AudioOnWeb.nowSEVolume);
        this.slideBarBGM = new SlideButtonOnCanvas(this.canvas.width/2 - 50, this.canvas.width/2 + 250, 230, AudioOnWeb.nowBGMVolume);
        this.description = Images.getImage("setting_title");
        this.frame_mini = Images.getImage("frame_mini");
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        super.mouseDown(x, y);
        this.slideBarBGM.mouseDown(x, y);
        this.slideBarSE.mouseDown(x, y);
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        super.mouseMove(x, y);
        this.mouseMoveSlideBarBGM(x, y);
        this.mouseMoveSlideBarSE(x, y);
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMoveSlideBarSE(x, y) {
        this.slideBarSE.mouseMove(x, y);
        AudioOnWeb.setSEVolume(this.slideBarSE.getNowStatus());
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMoveSlideBarBGM(x, y) {
        this.slideBarBGM.mouseMove(x, y);
        AudioOnWeb.setBGMVolume(this.slideBarBGM.getNowStatus());
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {
        super.mouseUp(x, y);
        this.slideBarBGM.mouseUp(x, y);
        this.slideBarSE.mouseUp(x, y);
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return MovePage.BEHIND_PAGE;
        }
        this.showWindow();
        return MovePage.CURRENT_PAGE;
    }

    /**
     * バーと文字の設定
     */
    showText(height, text) {
        let fontSize = 28;
        this.ctx.font = fontSize.toString() + "px Noto Sans JP";
        this.ctx.fillStyle = "#ff9933";
        height += fontSize/2;

        this.ctx.fillText(text, 100, height);
    }

    /**
     * スライドバーを表示
     */
    showSlideBarSE() {
        this.showText(this.slideBarSE.getStartH(), "効果音 音量");
        this.slideBarSE.showSlideButton();
    }

    /**
     * BGMをいじるスライドバーを表示
     */
    showSlideBarBGM() {
        this.showText(this.slideBarBGM.getStartH(), "BGM 音量");
        this.slideBarBGM.showSlideButton();
    }

    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showUndo();
        this.showSlideBarSE();
        this.showSlideBarBGM();
        this.showDescription();
    }
}
