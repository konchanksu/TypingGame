/**
 * キャラクター名未定、キャラ1を設定する
 */
class Character1 extends CharacterStatus {
    /**
     * コンストラクタ
     */
    constructor() {
        const attack = 25;
        const attackDownWidth = 5;
        const attackMax = 100;
        const attackUpWidth = 10;
        const damageWaitMax = 200;
        const hp = 500;
        const image = "/static/img/pekora.png";
        super(attack, attackDownWidth, attackMax, attackUpWidth, damageWaitMax, hp, image);

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
                return new Character1();
        }
    }

    static imageload() {
        const image1 = new Image();
        image1.src = "/static/img/pekora.png";
    }
}
