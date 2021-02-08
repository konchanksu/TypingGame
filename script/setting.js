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
    showSettingWindow() {
        this.settingWindow.canvasClear();
        this.settingWindow.showFrame();
    }

    inputKeyDown(key) {
        if(key == "ArrowLeft") {
            AudioSetting.softVolume();
            this.settingWindow.playAudioKettei();
        } else if(key == "ArrowRight") {
            AudioSetting.loudVolume();
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
}

/**
 * オーディオの設定を決めるクラス
 */
class AudioSetting {
    /**
     * 今の音量
     */
    static nowAudioVolume = 0.2;

    /**
     * 音量を大きくする
     */
    static loudVolume() {
        if(AudioSetting.nowAudioVolume < 0.9) { AudioSetting.nowAudioVolume += 0.2; }
    }
    　
    /**
     * 音量を小さくする
     */
    static softVolume() {
        if(AudioSetting.nowAudioVolume > 0.1) { AudioSetting.nowAudioVolume -= 0.2; }
    }
}
