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
        const image = "lemon";
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

/**
 * 敵を管理するクラス
 */
class Enemy {
    constructor() {
        const hp = 1000;
        this._hp = hp;
        this._hpMax = hp;
    }

    hp() {
        return this._hp;
    }

    /**
     * ダメージを判定する
     * @param {*} damage
     * @returns
     */
    receiveDamage(damage) {
        this._hp -= damage;
        if(this._hp <= 0) {
            this._hp = 0;
        }
        return this.isRemainHp();
    }

    /**
     * 体力が残っているかを判定する
     * @return 体力が残っているかどうか
     */
    isRemainHp() {
        if(this._hp <= 0) { return false; }
        return true;
    }

    /**
     * 残り体力の割合を(0~1で)返却する
     */
    hpPercent() {
        return (this._hp / this._hpMax);
    }
}
