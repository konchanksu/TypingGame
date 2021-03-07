/**
 * 一人でゲームをプレイ、を管理するクラス
 */
class SinglePlayPage {
    /**
     * コンストラクタ
     */
    constructor() {
        this.setSinglePlayWindow();
    }

    /**
     * 攻撃を行う
     */
    attack() {
        this.character.upAttack();
        const damage = this.character.toAttack();
        this.enemy.receiveDamage(damage);
    }

    /**
     * 文字列の入れ替え
     */
    changeText() {
        this.nowItem = Database.randomGet();
        this.nowKanji = this.nowItem.kanji_data;
        this.alreadyType = "";
        this.hiraganaToAlphabet.newTextSet(this.nowItem.hiragana_data);

        this.window.showWindow({kanjiText:this.nowKanji});
        this.window.showWindow({already:this.alreadyType, yet:this.hiraganaToAlphabet.romajiChangeListHead()});
    }

    /**
     * ゲームのカウントダウンを表示する
     */
    async gameCountDown() {
        const time = 60;
        for(let i = time; i > 0; i--) {
            this.window.showWindow({time:i});
            await sleep(1000);
            if(this.finish) { return new Promise(resolve => resolve()); }
        }

        return new Promise(resolve => resolve());
    }

    /**
     * キーボードが押下された時の処理
     * @param {String} key
     */
    keyDown(key) {
        if(!this.start || this.finish) return;
        if(key == "Escape") {
            this.showFinish();
            return;
        }

        if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
            this.rightTyping(key);
        } else {
            this.missTyping();
        }
        this.window.showWindow({correct:this.rightTypeCount, miss:this.missTypeCount});
    }

    /**
     * ミスタイプをした時の処理
     */
    missTyping() {
        this.missTypeCount++;
        this.character.downAttack();
        AudioUsedRegularly.playAudioMissType();
    }

    /**
     * マウスが下がった時の処理
     * @param {Ingeter} x
     * @param {Integer} y
     */
    mouseDown(x, y) {
        if(this.finish) { this.window.mouseDown(x, y); }
    }

    /**
     * マウスが動いた時に行う処理
     * @param {Integer} x
     * @param {Integer} y
     */
    mouseMove(x, y) {
        if(this.finish) { this.window.mouseMove(x, y); }
    }

    /**
     * クリック処理をする
     * @param {Integer} x
     * @param {Integer} y
     */
    onClick(x, y) {
        if(!this.finish) return MovePage.CURRENT_PAGE;
        return this.window.onClick(x, y);
    }

    /**
     * 正しい入力だった時の処理
     * @param {String} key
     */
    rightTyping(key) {
        this.alreadyType += key;
        this.rightTypeCount++;
        AudioUsedRegularly.playAudioCorrectType();
        this.window.showWindow({already:this.alreadyType, yet:this.hiraganaToAlphabet.romajiChangeListHead()});
        if(this.hiraganaToAlphabet.isFinished()) {
            this.changeText();
            this.attack();
            if(this.enemy.hp() == 0) { this.showFinish(); }
            else {
                AudioUsedRegularly.playAudioAttack();
                this.window.minijumpAnimation();
            }
        }
    }

    /**
     * キャラクターをセットする
     * @param {CharacterStatus} character キャラクターステータスのデータ
     */
    setCharacter(character) {
        this.character = character;
        this.window.setCharacter(this.character);
    }

    /**
     * 新規でプレイする時に画面をセットするメソッド
     */
    setSinglePlayWindow() {
        this.start = false;
        this.finish = false;
        this.alreadyType = "";
        this.hiraganaToAlphabet = new HiraganaToAlphabet("");
        this.rightTypeCount = 0;
        this.missTypeCount = 0;

        this.window = new SinglePlayWindow();
        this.enemy = new Enemy();
        this.window.setEnemy(this.enemy);
        this.window.start();
    }

    /**
     * 終了後の表示を行う
     */
    showFinish() {
        this.finish = true;
        AudioUsedRegularly.stopAudioBattle();
        this.window.finish();
        this.window = new ResultWindow(this.rightTypeCount, this.missTypeCount);
        this.window.showWindow();
    }

    /**
     * ウィンドウを表示する
     */
    async showWindow() {
        await this.startCountDown();
        await this.gameCountDown();
        this.start = false;
        if(!this.finish) {
            this.finish = true;
            this.window = new ResultWindow(this.rightTypeCount, this.missTypeCount);
            this.window.showWindow();
        }
    }

    /**
     * スタートのカウントダウン
     */
    async startCountDown() {
        this.window.showCountDown(3);
        AudioUsedRegularly.playAudio3();
        await sleep(1000);
        this.window.showCountDown(2);
        AudioUsedRegularly.playAudio2();
        await sleep(1000);
        this.window.showCountDown(1);
        AudioUsedRegularly.playAudio1();
        await sleep(1000);
        this.start = true;
        this.window.showWindow();
        this.changeText();
        this.window.showWindow({correct:this.rightTypeCount, miss:this.missTypeCount});
        AudioUsedRegularly.playAudioStart();
        AudioUsedRegularly.playAudioBattle();

        return new Promise(resolve => resolve());
    }
}
