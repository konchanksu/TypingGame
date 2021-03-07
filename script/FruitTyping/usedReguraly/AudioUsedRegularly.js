/**
 * よく使う音源を定義するクラス
 */
 class AudioUsedRegularly {
    static BGM = new AudioOnWeb("/static/audio/bgm.mp3", AudioOnWeb.BGM);
    static KETTEI = new AudioOnWeb("/static/audio/kettei.mp3", AudioOnWeb.SE);
    static TYPING = new AudioOnWeb("/static/audio/typing.mp3", AudioOnWeb.SE);
    static CANCEL = new AudioOnWeb("/static/audio/cancel.mp3", AudioOnWeb.SE);
    static MISS = new AudioOnWeb("/static/audio/missType.mp3", AudioOnWeb.SE);
    static THREE = new AudioOnWeb("/static/audio/3.mp3", AudioOnWeb.SE);
    static TWO = new AudioOnWeb("/static/audio/2.mp3", AudioOnWeb.SE);
    static ONE = new AudioOnWeb("/static/audio/1.mp3", AudioOnWeb.SE);
    static START = new AudioOnWeb("/static/audio/start.mp3", AudioOnWeb.SE);
    static JUMP = new AudioOnWeb("/static/audio/Jump.mp3", AudioOnWeb.SE);

    /**
     * 決定の効果音を鳴らす
     */
    static playAudioKettei() {
        AudioUsedRegularly.KETTEI.playAudio();
    }

    /**
     * タイピング音を鳴らす
     */
    static playAudioCorrectType() {
        AudioUsedRegularly.TYPING.playAudio();
    }

    /**
     * bgmを鳴らす
     */
    static playAudioBGM() {
        AudioUsedRegularly.BGM.playAudioLoop();
    }

    /**
     * キャンセル音を鳴らす
     */
    static playAudioCancel() {
        AudioUsedRegularly.CANCEL.playAudio();
    }

    /**
     * 失敗した時の音を鳴らす
     */
    static playAudioMissType() {
        AudioUsedRegularly.MISS.playAudio();
    }

    /**
     * 3を鳴らす
     */
    static playAudio3() {
        AudioUsedRegularly.THREE.playAudio();
    }

    /**
     * 2を鳴らす
     */
    static playAudio2() {
        AudioUsedRegularly.TWO.playAudio();
    }

    /**
     * 1を鳴らす
     */
    static playAudio1() {
        AudioUsedRegularly.ONE.playAudio();
    }

    /**
     * スタートを鳴らす
     */
    static playAudioStart() {
        AudioUsedRegularly.START.playAudio();
    }

    /**
     * ジャンプした音を鳴らす
     */
    static playAudioJump() {
        AudioUsedRegularly.JUMP.playAudio();
    }
}
