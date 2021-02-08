/**
 * タイトルを表示するページ
 */
class TitlePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = new TitleWindow();

        /**
         * 現在位置の変数
         */
        this.nowCursor = 0;
    }

    /**
     * タイトルウィンドウの表示
     */
    showTitleWindow() {
        this.window.showTitleWindow(this.nowCursor);
    }

    /**
     * キー入力が押された時の処理
     * @param　押下されたキー
     * @return {Integer} -1なら何も起きない、それ以外の数字なら数字に対応づけられたページに遷移
     */
    inputKeyDown(key) {
        if(key == "ArrowUp") {
            if(this.nowCursor == 0) this.nowCursor = 3;
            this.nowCursor = (this.nowCursor - 1) % 3;
            this.window.showTitleWindow(this.nowCursor);
        } else if(key == "ArrowDown") {
            this.nowCursor = (this.nowCursor + 1) % 3;
            this.window.showTitleWindow(this.nowCursor);
        } else if(key == "Enter") {
            // 音を出す
            this.window.playAudioKettei();
            return this.nowCursor;
        }
        return -1;  // 何も起きない
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
     * 画像の読み込みを行う
     */
    imageLoad() {
        super.imageLoad();
        this.chara = new Image();
        this.chara.src = "/static/img/title.png";
        this.pekora = new Image();
        this.pekora.src = "/static/img/pekora.png";
        this.single = new Image();
        this.single.src = "/static/img/single_play.png";
        this.multi = new Image();
        this.multi.src = "/static/img/multi_play.png";
        this.setting = new Image();
        this.setting.src = "/static/img/setting.png";
    }

    /**
     * ボタン部分を消去する
     */
    buttonClear() {
        let height = 350;
        this.ctx.clearRect(0, height, this.windowWidth, this.widnowHeight-height);
    }

    /**
     * ウィンドウ全体を表示する
     * @param nowCursor 現在のカーソル位置
     */
    showTitleWindow(nowCursor) {
        this.canvasClear();
        this.ctx.drawImage(this.frame, 0, 0);
        this.showTitle();
        this.showButton();
        this.showCursor(nowCursor);
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        this.ctx.drawImage(this.pekora, 0, 0);
        this.ctx.drawImage(this.chara, 10, 40);
    }

    /**
     * カーソルを表示する
     */
    showCursor(nowCursor) {
        let width = 210;
        let height = 50;
        this.ctx.strokeRect((this.windowWidth - width) / 2, 335 + 60*nowCursor, width, height);
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        let width = 200;
        this.ctx.drawImage(this.single, (this.windowWidth - width) / 2, 320);
        this.ctx.drawImage(this.multi, (this.windowWidth - width) / 2, 380);
        this.ctx.drawImage(this.setting, (this.windowWidth - width) / 2, 440);
    }
}
