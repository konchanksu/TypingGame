/**
 * キャラクターのステータスを管理するクラス
 */
class CharacterStatus {
    /**
     * コンストラクタ
     * @param {*} hp 体力
     * @param {*} attackPower 攻撃力
     * @param {*} attackUpWidth 攻撃の上がり幅
     * @param {*} maxAttack 最大攻撃力
     * @param {*} attackDownWidth 攻撃の下り幅
     * @param {*} waitDamageMax ダメージ待機で耐えられる最大値
     */
    constructor(hp, attackPower, attackUpWidth, maxAttack, attackDownWidth, waitDamageMax) {
        this.hp = hp;
        this.maxHp = hp;
        this.attackPower = attackPower;
        this.attackUpWidth = attackUpWidth;
        this.attackDownWidth = attackDownWidth;
        this.maxAttack = maxAttack;
        this.waitDamage = 0;
        this.waitDamageMax = waitDamageMax;
    }

    /**
     * 攻撃力増加処理
     */
    attackUp() {
        this.attackPower = Math.min(this.maxAttack, this.attackPower+this.attackUpWidth);
    }

    /**
     * 攻撃力減少処理
     */
    attackDown() {
        this.attackPower = Math.max(10, this.attackPower-this.attackDownWidth);
    }

    /**
     * ダメージ待機時にダメージを受けた時の処理
     * @param {Integer} damageData ダメージ量
     * @return {Boolean}　残っていればtrue、残っていなければfalse
     */
    damage(damageData) {
        this.waitDamage += damageData;
        if(this.waitDamage > this.waitDamageMax) {
            this.hp -= this.waitDamage - this.waitDamageMax;
        }
        return this.isHpRemain();
    }

    /**
     * ダメージが溢れた時の処理
     * @return {Boolean} hpが残っているかどうか
     */
    damageFlow() {
       this.hp -= this.waitDamage;
       this.waitDamage = 0;
       return this.isHpRemain();
    }

    /**
     * 体力が残っているかどうか
     * @return {Boolean}　残っていればtrue、残っていなければfalse
     */
    isHpRemain() {
        if(this.hp > 0) { return true; }
        return false;
    }

    /**
     * 攻撃を行う処理
     * @return {Integer} damageData ダメージ量
     */
    toAttack() {
        let damageData = 0;
        if(this.waitDamage < this.attackPower) {
            damageData = this.attackPower - this.waitDamage;
            this.waitDamage = 0;
        } else {
            this.waitDamage = this.waitDamage - this.attackPower;
        }

        return damageData;
    }
}
