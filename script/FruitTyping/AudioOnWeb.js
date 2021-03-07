/**
 * オーディオを定義するクラス
 */
class AudioOnWeb extends Audio {
    /**
     * 今の音量
     */
    static nowSEVolume = 0.1;
    static nowBGMVolume = 0.1;

    static SE = 0;
    static BGM = 1;

    static SE_LIST = [];
    static BGM_LIST = [];

    /**
     * コンストラクタ
     * @param src audioのソース
     */
    constructor(src, musicType) {
        super();
        super.src = src;
        this.musicType = musicType;
        this.isNowPlayAudio = undefined;
        switch (this.musicType) {
            case AudioOnWeb.SE:
                AudioOnWeb.SE_LIST.push(this);
                this.volume = AudioOnWeb.nowSEVolume;
                break;
            case AudioOnWeb.BGM:
                AudioOnWeb.BGM_LIST.push(this);
                this.volume = AudioOnWeb.nowBGMVolume;
                break;
        }
    }

    /**
     * se音量を設定する
     */
    static setSEVolume(volume) {
        AudioOnWeb.nowSEVolume = volume;
        AudioOnWeb.changeAudioVolumeSE();
    }

    /**
     * bgm音量を設定する
     */
    static setBGMVolume(volume) {
        AudioOnWeb.nowBGMVolume = volume;
        AudioOnWeb.changeAudioVolumeBGM();
    }

    /**
     * オーディオを実行する
     */
    playAudio() {
        if (this.isNowPlayAudio !== undefined) {
            this.currentTime = 0.0;
        }
        this.isNowPlayAudio = super.play();
    }

    /**
     * オーディオをループして実行する
     */
    playAudioLoop() {
        this.playAudio();
        this.loop = true;
    }

    /**
     * 流れている曲を停止させる
     */
    stopAudio() {
        if(!this.paused) { this.pause(); }
    }

    /**
     * 音量を変更する
     */
    static changeAudioVolumeSE() {
        AudioOnWeb.SE_LIST.map( seItem => {
            seItem.volume = AudioOnWeb.nowSEVolume;
        });
    }

    /**
     * bgmの音量を変更する
     */
    static changeAudioVolumeBGM() {
        AudioOnWeb.BGM_LIST.map( bgmItem => {
            bgmItem.volume = AudioOnWeb.nowBGMVolume;
        });
    }
}

