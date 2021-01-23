/**
 *　ウェブソケットを用いて誰と誰が対戦するかを管理するクラス
 */
class MatchCombination {
    /**
     * コンストラクタ
     */
    constructor() {
        /**
         * webSocketの設定
         */
        this.ws = new WebSocket("ws://localhost:8000/ws");
        this.ws.onmessage = function(event) {
            let data = event.data.slice(1, -1).split(" ");
            if(data[0] == "__firstClient") {
                if(data[1] != "") { this.members = data.slice(1); }
                else { this.members = []; }
            }
            else if(data[0] == "__memberAdd") { this.members.push(data[1]); }
            else if(data[0] == "__memberDelete") { this.members = this.members.filter(n => n != data[1]) }
            this.showMember();
        }

        /**
         * キャンバス関連の設定
         */
        this.ws.canvas = document.getElementById("gameWindow");
        this.ws.ctx = this.ws.canvas.getContext("2d");
        this.ws.fontSize = 48;
        this.ws.windowWidth = 700;
        this.ws.widnowHeight = 550;
        this.ws.ctx.font = this.ws.fontSize.toString() + "px osaka";
        this.ws.members = [];

        /**
         * titleの表示を行う
         */
        this.ws.showTitle = function() {
            let titleText = "Wait Match";
            let textWidth = this.ctx.measureText( titleText ).width ;
            this.ctx.fillText(titleText, (this.windowWidth - textWidth) / 2, 180 );
        }

        /**
         * マッチする人の表示
         */
        this.ws.showMember = function() {
            this.ctx.clearRect(0, 200, this.canvas.width, this.canvas.height);
            this.ctx.font = "24px osaka"
            let textWidth;
            let width;
            let height = 32;

            for(let i = 0; i < Math.min(6, this.members.length - this.nowCursor); i++) {
                let titleText = this.members[this.nowCursor + i];
                textWidth = this.ctx.measureText( titleText ).width;
                if(i == 0) { width = textWidth; }
                this.ctx.fillText(titleText, (this.windowWidth - textWidth) / 2, 250 + i*60 );
            }
            this.ctx.font = "48px osaka"
            this.ctx.strokeRect((this.windowWidth - width) / 2 - 10, 225, width + 20, height);
        }

        /**
         * キャンバスを消去する
         */
        this.ws.canvasClear = function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        /**
         * メンバ関連の設定
         */
        this.ws.nowCursor = 0;

        this.ws.canvasClear(0);
        this.ws.showTitle();
        this.ws.showMember();
    }

    /**
     * メンバを表示する
     */
    showMember() {
        this.ws.showMember();
    }

    /**
     * キーの押下を入力する
     * @param key 入力されたキー
     */
    inputKeyDown(key) {
        // 下キーなら
        if(key == "ArrowDown") {
            this.ws.nowCursor += 1;
            if(this.ws.nowCursor == this.ws.members.length) { this.ws.nowCursor = 0; }
            this.ws.showMember();
        } else if(key == "ArrowUp") {
            this.ws.nowCursor -= 1;
            if(this.ws.nowCursor < 0) { this.ws.nowCursor = this.ws.members.length - 1; }
            this.ws.showMember();
        }
    }
}
