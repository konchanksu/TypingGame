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
        this.chara = new Image();
        this.chara.src = "/static/img/title.png";
        this.single = new ButtonOnCanvas("/static/img/single_play.png", "/static/img/single_play_hover.png");
        this.multi = new ButtonOnCanvas("/static/img/multi_play.png", "/static/img/multi_play_hover.png");
        this.setting = new ButtonOnCanvas("/static/img/setting.png", "/static/img/setting_hover.png");
    }

    onClick(x, y) {
        if(this.single.onClick(x, y)) {
            super.playAudioKettei();
            this.cannotClick();
            return GameController.single;
        }
        if(this.multi.onClick(x, y)) {
            super.playAudioKettei();
            this.cannotClick();
            return GameController.nickName;
        }
        if(this.setting.onClick(x, y)) {
            super.playAudioKettei();
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
        super.showFrame();
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
