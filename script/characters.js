/**
 * キャラクター名未定、キャラ1を設定する
 */
class CharacterAlpha extends CharacterStatus {
    /**
     * コンストラクタ
     */
    constructor() {
        super(500, 25, 10, 100, 5, 200);
        this.image = new Image();
        this.image.src = "/static/img/pekora.png";
        this.id = 1;
    }
}

/**
 * キャラクターたちを管理するクラス
 */
class Characters {
    static characters(characterId) {
        switch(characterId) {
            case 1:
                return new CharacterAlpha();
        }
    }

    static imageload() {
        const image1 = new Image();
        image1.src = "/static/img/pekora.png";
    }
}
