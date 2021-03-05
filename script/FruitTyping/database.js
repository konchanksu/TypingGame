
/**
 * データベースのItemを管理するクラス
 */
class Items {
    /**
     * コンストラクタ
     * @param {Integer} id データベースでの番号
     * @param {String} kanji_data データベース内の漢字の文章
     * @param {String} hiragana_data データベース内の平仮名の文章
     */
    constructor(id, kanji_data, hiragana_data) {
        this.id = id;
        this.kanji_data = kanji_data;
        this.hiragana_data = hiragana_data;
    }
}

/**
 * データベースを管理するクラス
 */
class Database {
    /**
     * データベースにある単語のリスト
     */
    static itemList = [];
    static randomItemList = [];

    /**
     * ItemListにデータを追加する
     * @param {Integer} id データベースでの番号
     * @param {String} kanji_data データベース内の漢字の文章
     * @param {String} hiragana_data データベース内の平仮名の文章
     */
    static pushItemList(id, kanji_data, hiragana_data) {
        Database.itemList.push( new Items(id, kanji_data, hiragana_data) );
        Database.randomItemList.push( Database.itemList[Database.itemList - 1] );
    }

    /**
     * 重複ありでランダムに入手する
     * @returns {Item} ランダムに入手したitemオブジェクト
     */
    static randomGetDouble() {
        return Database.itemList[Math.floor(Math.random() * Database.itemList.length)];
    }

    /**
     * ランダムにItemを入手する
     * @returns {Item} ランダムに入手したitemオブジェクト
     */
    static randomGet() {
        let randomIndex = Math.floor(Math.random() * Database.randomItemList.length);
        let returnItem = Database.randomItemList[randomIndex];
        Database.randomItemList = Database.randomItemList.filter(n => n != returnItem);
        return returnItem;
    }

    /**
     * 一度ランダムに取り出した要素を全て戻す
     */
    static resetRandomItemList() {
        Database.randomItemList = Database.itemList.slice(0);
    }
}

function itemSet() {
    const mojiData = [
        [0, "フォーチュンクッキー", "ふぉーちゅんくっきー"],
        [1, "サクサクメロンパン", "さくさくめろんぱん"],
        [2, "美味しいフルーツ頂きます", "おいしいふるーついただきます"],
        [3, "時計の針が止まっている", "とけいのはりがとまっている"],
        [4, "リモコンが逃げてる", "りもこんがにげてる"],
    ]

    mojiData.forEach(items => {
        Database.pushItemList(items[0], items[1], items[2]);
    })
}

