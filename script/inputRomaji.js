/**
 * キーボード入力を行うクラス
 */
class InputKeyBoard {
    /**
     * 特定の区間の文字集合を生成する
     * @param {*} charA
     * @param {*} charZ
     */
    static genCharArray(charA, charZ) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }

    /**
     * アルファベット一文字ずつの文字列を生成する
     */
    static alphabet = InputKeyBoard.genCharArray("a", "z") + InputKeyBoard.genCharArray("A", "Z");

    /**
     * 数字一文字ずつの文字列を生成する
     */
    static number = InputKeyBoard.genCharArray("0", "9");

    /**
     * コンストラクタ
     * @param {Integer} 文字数の最大値
     */
    constructor(textMax) {
        this.text = "";
        this.textMax = textMax;
    }

    /**
     * キー入力があった時の処理
     * @param key キーボードの入力
     */
    inputKeyDown(key) {
        if(this.text.length < this.textMax){
            if(InputKeyBoard.alphabet.includes(key)) {
                this.text += key;
            } else if(InputKeyBoard.number.includes(key)) {
                this.text += key;
            }
        }

        if(this.text.length > 0) {
            if(key == "Backspace") {
                this.text = this.text.slice(0, this.text.length -1);
            }
        }
        console.log(this.text);
    }

    /**
     * キー入力があった時の処理 数字のみ
     * @param key キーボードの入力
     */
    inputKeyDownOnlyNumber(key) {
        if(this.text.length < this.textMax){
            if(InputKeyBoard.number.includes(key)) {
                this.text += key;
            }
        }

        if(this.text.length > 0) {
            if(key == "Backspace") {
                this.text = this.text.slice(0, this.text.length -1);
            }
        }
        console.log(this.text);
    }
}
