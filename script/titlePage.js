/**
 * タイトルを表示するページ
 */
class TitlePage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 48;
        this.windowWidth = 700;
        this.widnowHeight = 550;
        this.ctx.font = this.fontSize.toString() + "px osaka";

        this.showTitle();
        this.coverButton = this.showButton();
    }

    /**
     * titleの表示を行う
     */
    showTitle() {
        let titleText = "Battle Typing";
        let textWidth = this.ctx.measureText( titleText ).width ;
        this.ctx.fillText(titleText, (this.windowWidth - textWidth) / 2, 180 ) ;
    }

    /**
     * 戦いを始めるボタンを表示する
     */
    showButton() {
        let width = 200;
        let height = 40;
        this.ctx.rect((this.windowWidth - width) / 2, 400, width, height);
        this.ctx.stroke();
        return [(this.windowWidth - width) / 2, 400, (this.windowWidth - width) / 2 + width, 400 + height];
    }

    /**
     * 戦いを始めるボタンが入力された時の処理
     */
    onButtonClick(x, y) {
        if(this.coverButton[0] < x && x < this.coverButton[2] && this.coverButton[1] < y && y < this.coverButton[3]) {
            return true;
        }
        return false;
    }
}
