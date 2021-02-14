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
        this.slideBarSE = new SlideButtonOnCanvas(this.canvas.width/2 - 100, this.canvas.width/2 + 200, 370, AudioOnWeb.nowSEVolume, "se", (event) => {
            AudioOnWeb.setSEVolume(event.detail);
        });
        this.slideBarBGM = new SlideButtonOnCanvas(this.canvas.width/2 - 100, this.canvas.width/2 + 200, 200, AudioOnWeb.nowBGMVolume, "bgm", (event) => {
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
     * バーと文字の設定
     */
    showText(height, text) {
        let fontSize = 28;
        this.ctx.font = fontSize.toString() + "px osaka-mono";
        let end = this.canvas.width/2 - 150;
        this.ctx.fillStyle = "#ff9933";
        height += fontSize/2;
        let textWidth = this.ctx.measureText( text ).width;

        this.ctx.fillStyle = "#ff9933";
        this.ctx.fillText(text, (end - textWidth), height);
    }

    /**
     * スライドバーを表示
     */
    showSlideBarSE() {
        this.showText(370, "SE 音量");
        this.slideBarSE.showSlideButton();
    }

    /**
     * BGMをいじるスライドバーを表示
     */
    showSlideBarBGM() {
        this.showText(200, "BGM 音量");
        this.slideBarBGM.showSlideButton();
    }
}
