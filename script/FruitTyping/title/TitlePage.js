/**
 * タイトルを表示するページ
 */
class TitlePage extends PageParents {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.window = new TitleWindow();
    }

    /**
     * このページをクリックできるようにする
     */
    canClick() {
        this.window.canClick();
    }

    /**
     * クリックした時の処理
     * @param x
     * @param y
     * @return 移動座標
     */
    onClick(x, y) {
        const result = this.window.onClick(x, y);
        return Promise.resolve(result).then( resolve => {
            return resolve;
        });
    }
}
