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
        this.window.showSEVolume();
        this.window.showUndo();
    }

    inputKeyDown(key) {
        if(key == "ArrowLeft") {
            AudioOnWeb.softSEVolume();
            this.showWindow();
            AudioUsedRegularly.playAudioKettei();
        } else if(key == "ArrowRight") {
            AudioOnWeb.loudSEVolume();
            this.showWindow();
            AudioUsedRegularly.playAudioKettei();
        }
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
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
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
     * SE音量ボリュームを表示する
     */
    showSEVolume() {
        let boxQuantity = parseInt(AudioOnWeb.nowSEVolume * 10 + 0.1);
        let maxQuantity = 5;
        let startW = 300;
        let startH = 100;
        let width = 30;
        let height = 60;
        let blank = 20;

        this.ctx.fillStyle = "#ff9933";
        this.ctx.strokeStyle = "#ff9933";
        this.ctx.font = "32px Osaka";

        this.ctx.fillText("効果音: ", 140, startH + height*2 / 3);

        for(let i = 0; i < maxQuantity; i++) {
            if(i < boxQuantity) {
                this.ctx.fillRect(startW, startH, width, height);
            } else {
                this.ctx.strokeRect(startW, startH, width, height);
            }
            startW += width + blank;
        }
    }
}
