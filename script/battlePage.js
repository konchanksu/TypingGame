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
            let data = event.data.slice(1, event.data.length - 1).split(" ");
            // ゲームが始まる前
            if(this.first) {
                console.log(data);
                this.aiteKey = data[0];
                this.aiteNickName = data[1];
                this.multiGame = new MultiGame(this.aiteNickName);
                this.first = false;
            }
            // ゲームが始まった後
            else {
                console.log(data);
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

    /**
     * キー入力があった時の処理
     * @param key キー入力
     */
    inputKeyDown(key) {
        if(!this.ws.first) {
            let damageData = this.ws.multiGame.inputKeyDown(key);
            if(damageData != 0) {
                this.ws.send("battle " + this.ws.aiteKey + " " + damageData.toString());
            }
        }
    }
}
