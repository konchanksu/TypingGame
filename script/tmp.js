/**
 * キーボードゲームを開始するクラス
 */
class KeyBoardGame {
    /**
     * コンストラクタ
     */
    constructor() {
        // this.randomChar = new RandomChar();
        this.hiraganaToAlphabet = new HiraganaToAlphabet("");
        this.gamePaused();
    }

    /**
     * ゲームが始まっている時にキーボードの入力を受けた際の処理
     * @param {keyDown} event
     */
    gamePlay(event) {
        let key = event.key;
        if(this.isGameStarted) {
            if(key == "Escape") {
                this.gamePaused();
            } else if(this.hiraganaToAlphabet.isAbleToInputRomaji(key)) {
                this.onGameCorrectTyping(key);
            } else {
                this.onGameMissTyping();
            }

            if(this.hiraganaToAlphabet.isFinished()) {
                this.gameClear();
            }

        } else {
            if(key == " ") {
                this.gameReset();
                this.gameStart();
                this.startGameTime = Date.now();
            }
        }
    }

    /**
     * ゲームをクリア状態に変更する
     */
    gameClear() {
        let endGameTime = Date.now();
        let diffarence = endGameTime - this.startGameTime;
        this.isGameStarted = false;
        this.showGameWindow(
            "Game Clear　　Time:" +
            diffarence.toString().slice(0, -3) +
            "秒" +
            diffarence.toString().slice(-3) +
            "　　スペースキーでもう一度"
        );
        this.showRomajiWindow("");
    }

    /**
     * ゲームを中断する
     */
    gamePaused() {
        this.gameReset();
        this.showGameWindow("スペースキーでゲームスタート");
    }

    /**
     * ゲームをPlay前の状態に戻す
     */
    gameReset() {
        this.isGameStarted = false;
        this.correctTyping = 0;
        this.missTyping = 0;
        this.typeKey = "";
        // this.randomChar.randomCharSet();
        this.hiraganaToAlphabet.newTextSet("なんかてきとうににほんごにゅうりょくできるもじれつをつくってみた");
        this.showSubMenu("");
    }

    /**
     * ゲームを開始状態に変更する
     */
    gameStart() {
        this.isGameStarted = true;
        this.gameContentsOnDisplay();
    }

    /**
     * ランダムな文字をディスプレイに表示する
     */
    gameContentsOnDisplay() {
        // this.showGameWindow(this.randomChar.charArray.join(" "));
        this.showGameWindow(this.hiraganaToAlphabet.text);
        this.showRomajiWindow(this.typeKey);
        this.showSubMenu(
            "入力した数:" +
            (this.correctTyping + this.missTyping).toString() +
            "  正しい入力:" +
            this.correctTyping.toString() +
            "  誤った入力:" +
            this.missTyping.toString()
        );
    }

    /**
     * ゲーム中に正しいタイプが発生した時の動作
     * @param {String} key 入力したキー
     */
    onGameCorrectTyping(key) {
        this.correctTyping += 1;
        this.typeKey += key;
        // this.randomChar.randomCharDelete();
        this.gameContentsOnDisplay();
    }

    /**
     * ゲーム中にミスタイプが発生した時の動作
     */
    onGameMissTyping() {
        this.missTyping += 1;
        // this.randomChar.randomCharAppend();
        this.gameContentsOnDisplay();
    }

    /**
     * 文字列をid frameに表示させる
     * @param {String} str 表示させる文字列
     */
    showGameWindow(str) {
        let element = document.getElementById("gameWindow");
        element.innerHTML = str;
    }

    /**
     * 文字列をid romajiに表示させる
     * @param {*} str
     */
    showRomajiWindow(str) {
        let element = document.getElementById("romaji");
        element.innerHTML = str;
    }

    /**
     * ゲームのサブメニューを表示する
     * @param {String} str 表示させる文字列
     */
    showSubMenu(str) {
        let element = document.getElementById("subMenu");
        element.innerHTML = str;
    }
}

/**
 * ランダムな文字列を生成,取り出し,削除するクラス
 */
class RandomChar {
    /**
     * 小文字のzのkeyCode定数
     */
    static end = 122;

    /**
     * 小文字のaのkeyCode定数
     */
    static first = 97;

    /**
     * コンストラクタ
     */
    constructor() {
        this.randomCharSet();
    }

    /**
     * ランダムな文字列を一つ追加する
     */
    randomCharAppend() {
        this.charArray.push(this.randomCharBuild());
    }

    /**
     * ランダムな文字列を生成する
     * @return {String} ランダムな文字列
     */
    randomCharBuild() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + RandomChar.first);
    }

    /**
     * ランダムに生成した文字列を一つ削除する
     */
    randomCharDelete() {
        this.charArray.shift();
    }

    /**
     * ランダムな文字列を生成する
     */
    randomCharSet() {
        this.charArray = new Array();
        for(let i = 0; i < 100; i++) {
            this.charArray[i] = this.randomCharBuild();
        }
    }
}

/**
 * 平仮名とアルファベットをきちんと入力できるようにするクラス
 */
class HiraganaToAlphabet {
    /**
     * 平仮名とローマ字を対応する辞書
     */
    static hiraganaDictionary = {
        "あ":["a"], "い":["i"], "う":["u"], "え":["e"], "お":["o"],
        "か":["ka"], "き":["ki"], "く":["ku"], "け":["ke"], "こ":["ko"],
        "さ":["sa"], "し":["si", "shi"], "す":["su"], "せ":["se"], "そ":["so"],
        "た":["ta"], "ち":["ti", "chi"], "つ":["tu", "tsu"], "て":["te"], "と":["to"],
        "な":["na"], "に":["ni"], "ぬ":["nu"], "ね":["ne"], "の":["no"],
        "は":["ha"], "ひ":["hi"], "ふ":["fu", "hu"], "へ":["he"], "ほ":["ho"],
        "ま":["ma"], "み":["mi"], "む":["mu"], "め":["me"], "も":["mo"],
        "や":["ya"], "ゆ":["yu"], "よ":["yo"],
        "ら":["ra"], "り":["ri"], "る":["ru"], "れ":["re"], "ろ":["ro"],
        "わ":["wa"], "を":["wo"], "ん":["n", "nn"],
        "が":["ga"], "ぎ":["gi"], "ぐ":["gu"], "げ":["ge"], "ご":["go"],
        "ざ":["za"], "じ":["zi", "ji"], "ず":["zu"], "ぜ":["ze"], "ぞ":["zo"],
        "だ":["da"], "ぢ":["di"], "づ":["du"], "で":["de"], "ど":["do"],
        "ば":["ba"], "び":["bi"], "ぶ":["bu"], "べ":["be"], "ぼ":["bo"],
        "ぱ":["pa"], "ぴ":["pi"], "ぷ":["pu"], "ぺ":["pe"], "ぽ":["po"],
        "ぁ":["xa", "la"], "ぃ":["xi", "li"], "ぅ":["xu", "lu"], "ぇ":["xe", "le"], "ぉ":["xo", "lo"],
        "ゃ":["lya", "xya"], "ゅ":["lyu", "xyu"], "ょ":["lyo", "xyo"], "っ":["xtu", "ltu"],
        "きゃ":["kya"], "きゅ":["kyu"], "きょ":["kyo"],
        "じゃ":["ja", "zya"], "じゅ":["ju", "zyu"], "じょ":["jo", "zyo"],
        "ちゃ":["tya", "cha"], "ちゅ":["tyu", "chu"], "ちょ":["tyo", "cho"],
        "にゃ":["nya"], "にゅ":["nyu"], "にょ":["nyo"],
        "ひゃ":["hya"], "ひゅ":["hyu"], "ひょ":["hyo"],
        "ふぁ":["fa"], "ふぉ":["fo"],
        "りゃ":["rya"], "りゅ":["ryu"], "りょ":["ryo"]
    };

    /**
     * んがまじったときに特殊入力になる平仮名リスト
     */
    static hiraganaSpecialListN = [
        "", "な", "に", "ぬ", "ね", "の", "あ", "い", "う", "え", "お", "ん"
    ];

    /**
     * っ以外の小文字のリスト
     */
    static hiraganaSpecialListSmall = [
        "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ"
    ];

    /**
     * @param {String} text 平仮名のテキスト
     */
    constructor(text) {
        this.newTextSet(text);
    }

    /**
     * 現在の文字とその一つ次の文字を確認し
     * 入力可能なキー入力の種類を列挙して返却するメソッド
     * @return {Array} 正しい入力ローマ字の種類のリスト
     */
    canRomajiChangeList() {
        let now_char = this.nowInputText.charAt(0);
        let next_char = "";
        if (this.nowInputText.length > 1) { next_char = this.nowInputText.charAt(1); }

        if(now_char == "ん") {
            this.nowInputText = this.nowInputText.slice(1);

            if(HiraganaToAlphabet.hiraganaSpecialListN.includes(next_char)) {
                return ["nn"];
            } else {
                return HiraganaToAlphabet.hiraganaDictionary[now_char];
            }

        } else if(HiraganaToAlphabet.hiraganaSpecialListSmall.includes(next_char)) {
            this.nowInputText = this.nowInputText.slice(2);

            let returnList = [""];
            let tmpList = [];
            HiraganaToAlphabet.hiraganaDictionary[now_char].forEach(element => {
                returnList.forEach(element2 => { tmpList.push(element2.concat(element)); })
            });

            returnList = tmpList.slice(0);

            tmpList = [];

            HiraganaToAlphabet.hiraganaDictionary[next_char].forEach(element => {
                returnList.forEach(element2 => { tmpList.push(element2 + element); })
            });

            returnList = tmpList.slice(0);

            if(Object.keys(HiraganaToAlphabet.hiraganaDictionary).includes(now_char + next_char)) {
                returnList = returnList.concat(HiraganaToAlphabet.hiraganaDictionary[now_char+next_char]);
            }

            return returnList;

        } else if(now_char == "っ") {
            this.nowInputText = this.nowInputText.slice(2);

            let returnList = [""];
            let tmpList = [];
            HiraganaToAlphabet.hiraganaDictionary[now_char].forEach(element => {
                returnList.forEach(element2 => { tmpList.push(element2 + element); })
            });

            returnList = tmpList.slice(0);

            tmpList = [];

            HiraganaToAlphabet.hiraganaDictionary[next_char].forEach(element => {
                returnList.forEach(element2 => { tmpList.push(element2 + element); })
            });

            returnList = tmpList.slice(0);

            HiraganaToAlphabet.hiraganaDictionary[next_char].forEach(element => {
                if(!HiraganaToAlphabet.hiraganaSpecialListN.includes(element.charAt(0))) {
                    returnList.push(element.charAt(0) + element);
                }
            })

            return returnList;

        } else {
            this.nowInputText = this.nowInputText.slice(1);
            return HiraganaToAlphabet.hiraganaDictionary[now_char];
        }
    }

    /**
     * @param {String} key キー入力を受けて入力可能か
     * @return {Boolean} 成功したか
     */
    isAbleToInputRomaji(key) {
        let ableKeyList = [];
        this.ableTypeKeyList.forEach(element => {
            if(element[0] == key) {
                if(element.length > 1) { ableKeyList.push(element.slice(1)); }
                else { ableKeyList.push(""); }
            }
        })

        if(ableKeyList.length == 0) return false;
        console.log(this.ableTypeKeyList);
        this.ableTypeKeyList = ableKeyList;
        return true;
    }

    /**
     * 入力が終了したかどうかを確認する
     * @return {Boolean} 終了したかどうか
     */
    isFinished() {
        if(this.ableTypeKeyList.length == 1 && this.ableTypeKeyList[0] == "") { return true; }
        return false;
    }

    /**
     * 新しい文字列をセットする
     */
    newTextSet(text) {
        this.text = text;
        this.nowInputText = text;
        this.makeRomajiChangeList();
    }

    /**
     * 入力可能なキー入力のアルファベット列のリストを作成する
     */
    makeRomajiChangeList() {
        this.ableTypeKeyList = [""];
        while(this.nowInputText.length != 0) {
            let nextKeyList = [];
            let romaji = this.canRomajiChangeList()
            this.ableTypeKeyList.forEach(element => {
                romaji.forEach(element2 => {
                    nextKeyList.push(element + element2);
                })
            })

            this.ableTypeKeyList = nextKeyList;
        }
    }
}

function firstload() {
    keyBoardGame = new KeyBoardGame();
    window.addEventListener("keydown", event => { keyBoardGame.gamePlay(event) });
}
