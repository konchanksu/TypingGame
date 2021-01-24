/**
 *　ウェブソケットを用いて誰と誰が対戦するかを管理するクラス
 */
class BattlePage {
    /**
     * コンストラクタ
     */
    constructor(aikotoba, nickname) {
        this.aikotoba = aikotoba;
        /**
         * webSocketの設定
         */
        this.ws = new WebSocket("ws://localhost:8000/ws");
        this.ws.onmessage = function(event) {
            if(this.first) {
                console.log(event.data);
                this.aiteKey = event.data[0];
                this.aiteNickName = event.data[1];
            }
        }
        this.ws.nickname = nickname;
        this.ws.first = true;

        /**
         * キャンバス関連の設定
         */
        this.ws.canvas = document.getElementById("gameWindow");
        this.ws.ctx = this.ws.canvas.getContext("2d");
        this.ws.fontSize = 48;
        this.ws.windowWidth = 700;
        this.ws.widnowHeight = 550;
        this.ws.ctx.font = this.ws.fontSize.toString() + "px osaka";

        // ニックネームと合言葉を1秒待って送信
        const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        (async () => {
            await sleep(1000);
            this.ws.send("wait " + this.aikotoba + " " + this.ws.nickname);
        })();
    }
}
