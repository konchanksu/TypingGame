/**
 * タイトルのウィンドウを表示するクラス
 */
 class TitleWindow extends WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.imageLoad();
        this.charaWidth = -20;
        this.charaHeight = 30;
        this.canClickFlag = true;
        this.isNowJump = false;
    }

    /**
     * ページ移動の時のアニメを表示する
     */
    async movePageAnimation() {
        const max = 12;
        const waitTime = 35;

        const movePosition = upAndDownAnimation(max, this.charaHeight, this.charaHeight - 40);
        await sleep(200);
        for(const value of movePosition) {
            await sleep(waitTime);
            this.charaHeight = value;
            this.showWindow();
        }

        return new Promise(resolve => resolve());
    }

    /**
     * 小さいジャンプのアニメーションの表示
     */
    async miniJumpAnimation() {
        this.isNowJump = true;
        AudioUsedRegularly.playAudioJump();
        const max = 7;
        const waitTime = 30;

        const movePosition = upAndDownAnimation(max, this.charaHeight, this.charaHeight - 20);
        for(const value of movePosition) {
            await sleep(waitTime);
            this.charaHeight = value;
            this.showWindow();
        }
        this.isNowJump = false;
    }

    /**
     * このページをクリックできるようにする
     * ページ遷移中に連打不可能にするための処理
     */
    canClick() {
        this.canClickFlag = true;
    }

    /**
     * ボタンを押せなくする
     */
    cannotClick() {
        this.single.setAbleClick(false);
        this.multi.setAbleClick(false);
        this.setting.setAbleClick(false);
        this.canClickFlag = false;
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.logo = Images.getImage("title");
        this.character = Images.getImage("lemon");
        this.single = new ButtonOnCanvas("single_play");
        this.multi = new ButtonOnCanvas("multi_play");
        this.setting = new ButtonOnCanvas("setting");
    }

    /**
     * キャラがクリックされたかどうか
     * @param {*} x
     * @param {*} y
     */
    inCharacter(x, y) {
        [x, y] = position(x, y);
        if(this.charaWidth <= x && x <= this.charaWidth + this.character.width
            && this.charaHeight <= y && y <= this.charaHeight + this.character.height ) { return true; }
        return false;
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.single.mouseDown(x, y);
        this.multi.mouseDown(x, y);
        this.setting.mouseDown(x, y);
        this.showWindow();
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.single.mouseMove(x, y);
        this.multi.mouseMove(x, y);
        this.setting.mouseMove(x, y);
        this.showWindow();
    }

    /**
     * マウスが上がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseUp(x, y) {
        this.single.mouseUp(x, y);
        this.multi.mouseUp(x, y);
        this.setting.mouseUp(x, y);
        this.showWindow();
    }

    /**
     * ページ移動する時に行う処理
     */
    async movePage() {
        this.cannotClick();
        AudioUsedRegularly.playAudioKettei();
        await this.movePageAnimation();
        await sleep(200);
        return new Promise(resolve => resolve());
    }

    /**
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns 先に進むページ
     */
    async onClick(x, y) {
        this.mouseUp(x, y);
        if(!this.canClickFlag) { return -1; }
        if(this.single.onClick(x, y)) {
            await this.movePage();
            return GameController.SINGLE_CHARACTER_CHOOSE;
        }
        if(this.multi.onClick(x, y)) {
            await this.movePage();
            return GameController.NICKNAME;
        }
        if(this.setting.onClick(x, y)) {
            await this.movePage();
            return GameController.SETTING;
        }
        if(this.inCharacter(x, y) && !this.isNowJump) {
            this.miniJumpAnimation();
        }
        this.showWindow();
        return -1;
    }

    /**
     * ウィンドウ全体を表示する
     * @param nowCursor 現在のカーソル位置
     */
    showWindow() {
        this.canvasClear();
        this.showBackGround();
        this.showFrame();
        this.showTitle();
        this.showCharacter();
        this.showButton();
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        this.ctx.drawImage(this.logo, 350, 90);
    }

    /**
     * キャラクターを表示する
     */
    showCharacter() {
        this.ctx.drawImage(this.character, this.charaWidth, this.charaHeight);
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        let startH = 310;
        let height = 70;
        this.single.drawImage((this.windowWidth*3/4 - this.single.width()/2), startH);
        this.multi.drawImage((this.windowWidth*3/4 - this.multi.width()/2), startH + height);
        this.setting.drawImage((this.windowWidth*3/4 - this.setting.width()/2) , startH + height*2);
    }
}
