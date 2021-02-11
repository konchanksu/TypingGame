/**
 * 設定を表示するページ
 */
class SettingPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.settingWindow = new SettingWindow();
    }

    /**
     * セッティング画面を表示する
     */
    showWindow() {
        this.settingWindow.canvasClear();
        this.settingWindow.showFrame();
        this.settingWindow.showSEVolume();
    }

    inputKeyDown(key) {
        if(key == "ArrowLeft") {
            AudioSetting.softSEVolume();
            this.showWindow();
            this.settingWindow.playAudioKettei();
        } else if(key == "ArrowRight") {
            AudioSetting.loudSEVolume();
            this.showWindow();
            this.settingWindow.playAudioKettei();
        }
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
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
    }

    /**
     * フレームを表示する
     */
    showFrame() {
        this.ctx.drawImage(this.frame, 0, 0);
    }

    /**
     * SE音量ボリュームを表示する
     */
    showSEVolume() {
        let boxQuantity = parseInt(AudioSetting.nowSEVolume * 10 + 0.1);
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

/**
 * オーディオの設定を決めるクラス
 */
class AudioSetting {
    /**
     * 今の音量
     */
    static nowSEVolume = 0.1;

    /**
     * 音量を大きくする
     */
    static loudSEVolume() {
        if(AudioSetting.nowSEVolume < 0.45) { AudioSetting.nowSEVolume += 0.1; }
    }
    　
    /**
     * 音量を小さくする
     */
    static softSEVolume() {
        if(AudioSetting.nowSEVolume > 0.05) { AudioSetting.nowSEVolume -= 0.1; }
    }
}
