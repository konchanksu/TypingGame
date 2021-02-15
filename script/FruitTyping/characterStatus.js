/**
 * キャラクターのステータスを管理するクラス
 */
class CharacterStatus {
    /**
     * コンストラクタ
     * @param {Integer} attack 攻撃力
     * @param {Integer} attackDownWidth 攻撃の下り幅
     * @param {Integer} attackUpWidth 攻撃の上がり幅
     * @param {Integer} damageWaitMax ダメージ待機で耐えられる最大値
     * @param {Integer} hp 体力
     * @param {String} 相手の画像
     * @param {Integer} maxAttack 最大攻撃力
     */
    constructor(attack, attackDownWidth, attackMax, attackUpWidth, damageWaitMax, hp, image) {
        this._attack = attack;
        this._attackDownWidth = attackDownWidth;
        this._attackMax = attackMax;
        this._attackMin = attack;
        this._attackUpWidth = attackUpWidth;

        this._damageWait = 0;
        this._damageWaitMax = damageWaitMax;

        this._hp = hp;
        this._hpMax = hp;

        this._image = image;
    }

    /**
     * 攻撃力減少処理
     */
    downAttack() {
        this._attack = Math.max(this._attackMin, this._attack - this._attackDownWidth);
    }

    /**
     * ダメージが溢れた時の処理
     * @return {Boolean} hpが残っているかどうか
     */
    flowDamage() {
        this._hp -= this._damageWait;
        this._damageWait = 0;
        return this.isRemainHp();
    }

    /**
     * @return {Integer} 攻撃力
     */
    getAttack() {
        return this._attack;
    }

    /**
     * @return {Integer} 待機ダメージの表示
     */
    getDamageWait() {
        return this._damageWait;
    }

    /**
     * @return {Integer} 待機ダメージの最大値の表示
     */
    getDamageWaitMax() {
        return this._damageWaitMax;
    }

    /**
     * @return {Integer} 体力
     */
    getHp() {
        return this._hp;
    }

    /**
     * @return {Integer} 体力の最大値
     */
    getHpMax() {
        return this._hpMax;
    }

    /**
     * @return {Image} 画像データ
     */
    getImage() {
        return this._image;
    }

    /**
     * 体力が残っているかどうか
     * @return {Boolean}　残っていればtrue、残っていなければfalse
     */
    isRemainHp() {
        if(this._hp > 0) { return true; }
        return false;
    }

    /**
     * ダメージ待機時にダメージを受けた時の処理
     * @param {Integer} damage ダメージ量
     * @return {Boolean}　残っていればtrue、残っていなければfalse
     */
    receiveDamage(damage) {
        this._damageWait += damage;
        if(this._damageWait > this._damageWaitMax) {
            this._hp -= this._damageWait - this._damageWaitMax;
            this._damageWait = this._damageWaitMax;
        }
        return this.isRemainHp();
    }

    /**
     * 攻撃力を設定する
     * @param {Integer} attack 攻撃力
     */
    setAttack(attack) {
        this._attack = attack;
    }

    /**
     * 体力を設定する
     * @param {Integer} hp 体力
     */
    setHp(hp) {
        this._hp = hp;
    }

    /**
     * 攻撃を行う処理
     * @return {Integer} damage ダメージ量
     */
    toAttack() {
        let damage = 0;
        if(this._damageWait < this._attack) {
            damage = this._attack - this._damageWait;
            this._damageWait = 0;
        } else {
            this._damageWait -= this._attack;
        }

        return damage;
    }

    /**
     * 攻撃力増加処理
     */
    upAttack() {
        this._attack = Math.min(this._attackMax, this._attack + this._attackUpWidth);
    }
}
