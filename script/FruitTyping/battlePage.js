/**
 *　ウェブソケットを用いて誰と誰が対戦するかを管理するクラス
 */
class BattlePage {
    /**
     * コンストラクタ
     */
    constructor(aikotoba, nickname, character) {
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
                this.window.cannotClick();
                this.multiGame.setAiteNickname(this.aiteNickname);
                this.multiGame.setAiteCharacter(data[2]);
                this.multiGame.showWindow();
            }
            // ゲームが始まった後
            else if(!this.finish) {
                if(data[0] == "attack") {
                    this.beAttacked(data);
                }
                else if(data[0] == "aiteStatus") {
                    console.log(data);
                    this.multiGame.setAiteHp(data[1]);
                }
            }
        }

        this.ws.onclose = function(event) {
            if(!this.finish && !this.first) {
                this.winPage();
            }
        }

        this.ws.multiGame = new MultiGame(nickname, character);
        this.ws.nickname = nickname;
        this.ws.first = true;
        this.ws.finish = false;
        this.ws.win = false;
        this.ws.window = new FinishWindow();
        if(this.ws.first) this.ws.window.showWait();

        /**
         * 勝利したときの処理
         */
        this.ws.winPage = function() {
            this.finish = true;
            this.win = true;
            this.window.showWin();
        }

        /**
         * 負けたときの処理
         */
        this.ws.losePage = function() {
            this.send("attack " + this.aiteKey + " " + "-1");
            this.finish = true;
            this.window.showLose();
        }

        /**
         * 攻撃を受けたときの処理
         */
        this.ws.beAttacked = function(data) {
            let damage = parseInt(data[1]);
            // ダメージが存在する時
            if(damage > 0) {
                // ダメージでやられた時の処理
                if(!this.multiGame.receiveDamage(damage)) {
                    this.losePage();
                }
                // ダメージを受けただけの処理
                else {
                    this.send("aiteStatus " + this.aiteKey + " " + this.multiGame.getHp().toString());
                }
            }
            // ダメージが負の数，相手が敗北した時の処理
            else if(damage < 0) {
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
     */
    inputKeyDown(key) {
        if(!this.ws.first) {
            let damageData = this.ws.multiGame.inputKeyDown(key);
            if(damageData[1] != "") {
                this.ws.send(damageData[1] + " " + this.ws.aiteKey + " " + damageData[0].toString());
            }
            else if(damageData[0] < 0) {
                this.ws.losePage();
            }
        }
    }

    /**
     * クリックした時の処理
     * @param {*} x
     * @param {*} y
     */
    onClick(x, y) {
        if(this.ws.first) {
            return this.ws.window.onClick(x, y);
        }
        return -1;
    }

    /**
     * 終了したかどうか
     */
    isFinished() {
        return this.ws.finish;
    }

    /**
     * 終了した時の処理
     * @param key
     */
    inputKeyDownFinished(key) {
        if(key == "Escape") {
            return true;
        }
        return false
    }
}

/**
 * 終了後の表示を行うウィンドウ
 */
class FinishWindow extends WindowParents {
    constructor() {
        super();
        super.imageLoad();
    }

    cannotClick() {
        this.undo.setAbleClick(false);
    }

    /**
     * クリックされた時の処理
     * @param {*} x
     * @param {*} y
     */
    onClick(x, y) {
        if(this.undo.onClick(x, y)) {
            AudioUsedRegularly.playAudioCancel();
            this.cannotClick();
            return GameController.AIKOTOBA;
        }
    }

    /**
     * 勝利を表示
     */
    showWin() {
        this.canvasClear();
        const chara = Images.getImage("win");
        this.ctx.drawImage(chara, 0, 0);
    }

    /**
     * 敗北を表示
     */
    showLose() {
        this.canvasClear();
        const chara = Images.getImage("lose");
        this.ctx.drawImage(chara, 0, 0);
    }

    /**
     * 待機画面の表示
     */
    showWait() {
        this.canvasClear();
        const chara = Images.getImage("wait")
        this.ctx.drawImage(chara, 0, 0);

        this.showFrame();
        this.showUndo();
    }
}

