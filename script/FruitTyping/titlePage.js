/**
 * タイトルを表示するページ
 */
class TitlePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new TitleWindow();
    }

    /**
     * タイトルウィンドウの表示
     */
    showWindow() {
        this.window.showWindow();
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
        this.chara = Images.getImage("title");
        this.single = new ButtonOnCanvas("single_play");
        this.multi = new ButtonOnCanvas("multi_play");
        this.setting = new ButtonOnCanvas("setting");
    }

    onClick(x, y) {
        if(this.single.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.single;
        }
        if(this.multi.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.nickName;
        }
        if(this.setting.onClick(x, y)) {
            AudioUsedRegularly.playAudioKettei();
            this.cannotClick();
            return GameController.setting;
        }
        return -1;
    }

    /**
     * ウィンドウ全体を表示する
     * @param nowCursor 現在のカーソル位置
     */
    showWindow() {
        this.canvasClear();
        this.showFrame();
        this.showTitle();
        this.showButton();
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        this.ctx.drawImage(this.chara, 10, 40);
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        let startH = 310;
        let height = 70;
        this.single.drawImage((this.windowWidth - this.single.width()) / 2, startH);
        this.multi.drawImage((this.windowWidth - this.multi.width()) / 2, startH + height);
        this.setting.drawImage((this.windowWidth - this.setting.width()) / 2, startH + height*2);
    }
}
