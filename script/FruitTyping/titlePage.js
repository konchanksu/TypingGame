/**
 * タイトルを表示するページ
 */
class TitlePage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.window = new TitleWindow();
    }

    /**
     * クリックした時の処理
     * @param x
     * @param y
     * @return 移動座標
     */
    onClick(x, y) {
        return this.window.onClick(x, y);
    }
}

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
    }

    /**
     * ボタンを押せなくする
     */
    cannotClick() {
        this.single.setAbleClick(false);
        this.multi.setAbleClick(false);
        this.setting.setAbleClick(false);
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
     * クリック後の遷移先のページを決定する
     * @param {*} x
     * @param {*} y
     * @returns 先に進むページ
     */
    onClick(x, y) {
        this.mouseUp(x, y);
        if(this.single.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.SINGLE_WAIT;
        }
        if(this.multi.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.NICKNAME;
        }
        if(this.setting.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.SETTING;
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
        this.ctx.drawImage(this.character, 60, 50);
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
