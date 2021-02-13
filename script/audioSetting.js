/**
 * オーディオを定義するクラス
 */
class AudioOnWeb extends Audio {
    /**
     * 今の音量
     */
    static nowSEVolume = 0.1;
    static nowBGMVolume = 0.1;

    static se = 0;
    static bgm = 1;

    static seList = [];
    static bgmList = [];

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
            case AudioOnWeb.se:
                AudioOnWeb.seList.push(this);
                break;
            case AudioOnWeb.bgm:
                AudioOnWeb.bgmList.push(this);
                break;
        }
    }

    /**
     * 音量を大きくする
     */
    static loudSEVolume() {
        if(AudioOnWeb.nowSEVolume < 0.45) { AudioOnWeb.nowSEVolume += 0.1; }
    }

    /**
     * 音量を大きくする
     */
    static loudBGMVolume() {
        if(AudioOnWeb.nowBGMVolume < 0.45) { AudioOnWeb.nowBGMVolume += 0.1; }
    }
    　
    /**
     * 音量を小さくする
     */
    static softSEVolume() {
        if(AudioOnWeb.nowSEVolume > 0.05) { AudioOnWeb.nowSEVolume -= 0.1; }
    }

    /**
     * 音量を小さくする
     */
    static softBGMVolume() {
        if(AudioOnWeb.nowBGMVolume > 0.05) { AudioOnWeb.nowBGMVolume -= 0.1; }
    }

    /**
     * オーディオを実行する
     */
    playAudio() {
        if (this.isNowPlayAudio !== undefined) {
            this.currentTime = 0.0;
        }
        this.changeAudioVolume();
        this.isNowPlayAudio = super.play();
    }

    /**
     * 音量を変更する
     */
    changeAudioVolume() {
        switch (this.musicType) {
            case AudioOnWeb.se:
                AudioOnWeb.seList.map( seItem => {
                    seItem.volume = AudioOnWeb.nowSEVolume;
                })
                break;
            case AudioOnWeb.bgm:
                AudioOnWeb.bgmList.map( bgmItem => {
                    bgmItem.volume = AudioOnWeb.nowBGMVolume;
                })
                break;
        }
    }
}

