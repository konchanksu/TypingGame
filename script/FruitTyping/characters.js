/**
 * キャラクター名未定、キャラ1を設定する
 */
class LemonChara extends CharacterStatus {
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
        const image = Images.getImage("lemon");
        super(attack, attackDownWidth, attackMax, attackUpWidth, damageWaitMax, hp, image);

        this.id = Characters.lemon;
    }
}

/**
 * キャラクター名未定、キャラ2を設定する
 */
class Character2 extends CharacterStatus {
    /**
     * コンストラクタ
     */
    constructor() {
        const attack = 40;
        const attackDownWidth = 10;
        const attackMax = 130;
        const attackUpWidth = 10;
        const damageWaitMax = 150;
        const hp = 300;
        const image = Images.getImage("mio");
        super(attack, attackDownWidth, attackMax, attackUpWidth, damageWaitMax, hp, image);

        this.id = Characters.mio;
    }
}

/**
 * キャラクターたちを管理するクラス
 */
class Characters {
    static lemon = 1;
    static mio = 2;

    static characters(characterId) {　
        switch(characterId) {
            case Characters.lemon:
                return new LemonChara();
            case Characters.mio:
                return new Character2();
        }
    }
}
