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
                this.aiteKey = data[0];
                this.aiteNickname = data[1];
                this.first = false;
                this.multiGame.setAiteNickname(this.aiteNickname);
                this.multiGame.setAiteCharacter(data[2]);
                this.multiGame.showBattleWindow();
            }
            // ゲームが始まった後
            else if(!this.finish) {
                if(data[0] == "attack") {
                    this.beAttacked(data);
                }
                else if(data[0] == "aiteStatus") {
                    this.multiGame.setAiteHp(data[1]);
                }
            }
        }

        this.ws.onclose = function(event) {
            if(!this.finish && !this.first) {
                this.winPage();
            }
        }

        this.ws.multiGame = new MultiGame();
        this.ws.nickname = nickname;
        this.ws.first = true;
        this.ws.finish = false;
        this.ws.win = false;
        this.ws.finishWindow = new FinishWindow();
        if(this.ws.first) this.ws.finishWindow.showWait();

        /**
         * 勝利したときの処理
         */
        this.ws.winPage = function() {
            this.finish = true;
            this.win = true;
            this.finishWindow.showWin();
        }

        /**
         * 負けたときの処理
         */
        this.ws.losePage = function() {
            this.send("attack " + this.aiteKey + " " + "-1");
            this.finish = true;
            this.finishWindow.showLose();
        }

        /**
         * 攻撃を受けたときの処理
         */
        this.ws.beAttacked = function(data) {
            let damageData = parseInt(data[1]);
            if(damageData > 0) {
                if(!this.multiGame.reseiveDamage(damageData)) {
                    this.losePage();
                } else {
                    this.send("aiteStatus " + this.aiteKey + " " + this.multiGame.getHp().toString());
                }
            } else if(damageData < 0) {
                this.winPage();
            }
        }

        // ニックネームと合言葉を1秒待って送信
        const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        (async () => {
            await sleep(1000);
            this.ws.send(
                "wait " +
                this.aikotoba +
                " " +
                this.ws.nickname +
                " " +
                this.ws.multiGame.character.id
            );
        })();
    }

    /**
     * キー入力があった時の処理
     * @param key キー入力
     * @return {Boolean} 終了するかどうか
     */
    inputKeyDown(key) {
        if(!this.ws.first) {
            let damageData = this.ws.multiGame.inputKeyDown(key);
            if(damageData > 0) {
                this.ws.send("attack " + this.ws.aiteKey + " " + damageData.toString());
            }
            else if(damageData < 0) {
                this.ws.losePage();
            }
        } else {
            if(key == "Escape") {
                return true;
            }
            return false
        }
        return false;
    }

    /**
     * 終了後のキー入力
     * @return {Boolean} 終了するかどうか
     */
    inputKeyDownFinished(key) {
        if(key == "Enter" || key == "Escape") {
            return true;
        }
        return false;
    }

    /**
     * ゲームが終了しているかどうか
     * @return {Boolean} 終了しているかどうか
     */
    isFinished() {
        return this.ws.finish;
    }
}

/**
 * 終了後の表示を行うウィンドウ
 */
class FinishWindow {
    constructor() {
        this.canvas = document.getElementById("gameWindow");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "24px osaka-mono"
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
    }

    /**
     * canvas Clear
     */
    canvasClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 勝利を表示
     */
    showWin() {
        this.canvasClear();
        const chara = new Image();
        chara.src = "/static/img/win.png";
        chara.onload = () => {
            this.ctx.drawImage(chara, 0, 0);
        };
    }

    /**
     * 敗北を表示
     */
    showLose() {
        this.canvasClear();
        const chara = new Image();
        chara.src = "/static/img/lose.png";
        chara.onload = () => {
            this.ctx.drawImage(chara, 0, 0);
        };
    }

    /**
     * 待機画面の表示
     */
    showWait() {
        this.canvasClear();
        const chara = new Image();
        chara.src = "/static/img/wait.png";
        chara.onload = () => {
            this.ctx.drawImage(chara, 0, 0);
        };
    }
}

