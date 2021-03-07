/**
 * ウィンドウ定義の親クラス
 */
class WindowParents {
    /**
     * コンストラクタ
     */
    constructor() {
        /**
         * キャンバス関係の情報
         */
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.gl = this.canvas.getContext("webgl");
        this.fontSize = TextSizeUsedReguraly.NORMAL;
        this.windowWidth = this.canvas.width;
        this.widnowHeight = this.canvas.height;
        this.ctx.font = FontUsedReguraly.monoSpace(this.fontSize);

        this.imageLoad();
    }

    /**
     * クリックできるようにする
     */
    canClick() {
        this.undo.setAbleClick(true);
        this.decision.setAbleClick(true);
    }

    /**
     * クリックできなくする
     */
    cannotClick() {
        this.undo.setAbleClick(false);
        this.decision.setAbleClick(false);
    }

    /**
     * キャンバスを消去する
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.windowWidth, this.widnowHeight);
    }

    /**
     * 画像の読み込みを行う
     */
    imageLoad() {
        this.frame = Images.getImage("frame");
        this.background = Images.getImage("background");
        this.undo = new ButtonOnCanvas("undo");
        this.decision = new ButtonOnCanvas("decision");
    }

    /**
     * マウスが押下された時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.undo.mouseDown(x, y);
        this.decision.mouseDown(x, y);
        this.showWindow();
    }

    /**
     * マウスが動いた時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.undo.mouseMove(x, y);
        this.decision.mouseMove(x, y);
        this.showWindow();
    }

    /**
     * マウスが上がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseUp(x, y) {
        this.undo.mouseUp(x, y);
        this.decision.mouseUp(x, y);
    }

    /**
     * 背景を表示する
     */
    showBackGround() {
        this.ctx.drawImage(this.background, 0, 0);
    }

    /**
     * 決定ボタンを表示する
     * @param {*} startW
     * @param {*} startH
     */
    showDecision(startW, startH) {
        this.decision.drawImage(startW, startH);
    }

    /**
     * 説明を同じ位置に表示する
     */
    showDescription() {
        this.ctx.drawImage(this.description, 110, 18);
    }

    /**
     * 外枠を表示する
     */
    showFrame() {
        this.ctx.drawImage(this.frame, 0, 0);
    }

    /**
     * 画面全体を表示する
     */
    showWindow() {}

    /**
     * アンドゥ機能を表示する
     */
    showUndo() {
        this.undo.drawImage(30, 30);
    }
}

/**
 * それぞれのページの親を実装する
 */
class PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        this.window = undefined;
    }

    /**
     * キー入力があった時の処理
     * @param key
     */
    inputKeyDown(key) {}

    /**
     * マウスが下がった時の処理
     * @param {*} x
     * @param {*} y
     */
    mouseDown(x, y) {
        this.window.mouseDown(x, y);
    }

    /**
     * マウスが動いた時に行う処理
     * @param {*} x
     * @param {*} y
     */
    mouseMove(x, y) {
        this.window.mouseMove(x, y);
    }

    /**
     * @param x
     * @param y
     * @return 移動先のサイト
     */
    onClick(x, y) {}

    /**
     * ページを表示する
     */
    showWindow() {
        this.window.showWindow();
    }
}

/**
 * ページ移動の固定の変数の定義
 */
class MovePage {
    static AHEAD_PAGE = 1;
    static BEHIND_PAGE = -1;
    static CURRENT_PAGE = 0;
}

/**
 * スリープする
 * @param {*} ms　ミリ秒
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 上下運動の動作を作成する
 * @param {*} totalFrame 下がるところを除いた合計のフレーム数
 * @param {*} moveMin
 * @param {*} moveMax
 */
function upAndDownAnimation(totalFrame, moveMin, moveMax) {
    let positions = [moveMin, moveMin + 15, moveMin + 20, moveMin];
    let pushNum;
    let wariai = 0.5;
    let now = 0;

    const diff = Math.abs(moveMax - moveMin);
    const half = parseInt(totalFrame / 2);
    const isEven = totalFrame % 2 == 0;

    for(let i = 0; i < totalFrame; i++) {
        if(i < half) {
            now += wariai;
            wariai /= 2;
        } else if (!isEven && i-2 <= half && half <= i+1) {
            now = 1;
            wariai = 0.5;
        } else if (isEven && i-1 <= half && half <= i+1 ) {
            now = 1;
            wariai = 0.5;
        } else {
            now -= wariai;
            wariai /= 2;
        }
        pushNum = moveMin - (diff * now);
        positions.push(parseInt(pushNum));
    }

    positions.push(moveMin);
    return positions;
}

/**
 * イベントの座標をキャンバスの座標に変更
 * @param {*} x
 * @param {*} y
 * @return canvasでの座標
 */
function position(x, y) {
    const canvas = document.getElementById("gameWindow");
    x -= canvas.getBoundingClientRect().left;
    y -= canvas.getBoundingClientRect().top;
    return [x, y];
}
