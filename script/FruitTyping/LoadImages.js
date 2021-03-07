/**
 * イメージを全て保管するクラス
 */
class Images {
    static images = {};
    static complete = 0;

    /**
     * イメージの名前と画像を結びつける
     * @param {*} src
     * @param {*} name
     * @return 画像
     */
    static imageAppend(src, name) {
        Images.images[name] = new Image();
        Images.images[name].src = src;
        return Images.images[name];
    }

    /**
     * あだ名に対応する画像を返却する
     * @param {*} name
     * @return 画像
     */
    static getImage(name) {
        return Images.images[name];
    }

    /**
     * イメージのプロミスを作成する
     * @param {*} src
     * @param {*} name
     * @return 読み込み完了時に進むPromise
     */
    static loadImage(src, name) {
        Images.imageAppend(src, name);
        return new Promise((resolve, reject) => {
            const img = Images.images[name];
            img.onload = () => { resolve(img); };
            img.onerror = error => { reject(error); };
        });
    }
}

const loadAllImages = function(gameController) {
    const srcNameList = [["/static/img/aikotoba_input.png", "aikotoba_input"],
                         ["/static/img/attack.png", "attack"],
                         ["/static/img/background.png", "background"],
                         ["/static/img/button/decision/decision.png", "decision"],
                         ["/static/img/button/decision/decision_down.png", "decision_down"],
                         ["/static/img/button/decision/decision_hover.png", "decision_hover"],
                         ["/static/img/button/multi_play/multi_play.png", "multi_play"],
                         ["/static/img/button/multi_play/multi_play_down.png", "multi_play_down"],
                         ["/static/img/button/multi_play/multi_play_hover.png", "multi_play_hover"],
                         ["/static/img/button/setting/setting.png", "setting"],
                         ["/static/img/button/setting/setting_down.png", "setting_down"],
                         ["/static/img/button/setting/setting_hover.png", "setting_hover"],
                         ["/static/img/button/single_play/single_play.png", "single_play"],
                         ["/static/img/button/single_play/single_play_down.png", "single_play_down"],
                         ["/static/img/button/single_play/single_play_hover.png", "single_play_hover"],
                         ["/static/img/button/undo/undo.png", "undo"],
                         ["/static/img/button/undo/undo_down.png", "undo_down"],
                         ["/static/img/button/undo/undo_hover.png", "undo_hover"],
                         ["/static/img/character/lemon/lemon.png", "lemon"],
                         ["/static/img/character/lemon/lemon_box.png", "lemon_box"],
                         ["/static/img/character/lemon/lemon_box_down.png", "lemon_box_down"],
                         ["/static/img/character/lemon/lemon_box_hover.png", "lemon_box_hover"],
                         ["/static/img/character/lemon/lemon_small.png", "lemon_small"],
                         ["/static/img/character/character2/character2_box.png", "character2_box"],
                         ["/static/img/character/character2/character2_box_down.png", "character2_box_down"],
                         ["/static/img/character/character2/character2_box_hover.png", "character2_box_hover"],
                         ["/static/img/character/character2/character2_box_hover_chara.png", "character2_box_hover_chara"],
                         ["/static/img/clock.png", "clock"],
                         ["/static/img/character/character2/mio.png", "mio"],
                         ["/static/img/countDown/count1.png", "count1"],
                         ["/static/img/countDown/count2.png", "count2"],
                         ["/static/img/countDown/count3.png", "count3"],
                         ["/static/img/frame.png", "frame"],
                         ["/static/img/frame_mini.png", "frame_mini"],
                         ["/static/img/lose.png", "lose"],
                         ["/static/img/name_plate.png", "name_plate"],
                         ["/static/img/nickname_input.png", "nickname_input"],
                         ["/static/img/resultPage.png", "resultPage"],
                         ["/static/img/title/aikotoba.png", "aikotoba"],
                         ["/static/img/title/characterChoose.png", "characterChoose"],
                         ["/static/img/title/junbiOK.png", "junbiOK"],
                         ["/static/img/title/matchingWait.png", "matching"],
                         ["/static/img/title/nickname.png", "nickname"],
                         ["/static/img/title/setting.png", "setting_title"],
                         ["/static/img/title/title.png", "title"],
                         ["/static/img/win.png", "win"],
    ]

    const promises = srcNameList.map(([src, name]) => Images.loadImage(src, name));

    Promise.all(promises)
    .then(() => {
        gameController.makeEachWindow();
    }).then(() => {
        gameController.moveToTitlePage();
    }).then(() => {
        window.addEventListener("keydown", event => { gameController.keyDown(event) });
        window.addEventListener("click", event => { gameController.onClick(event) });
        window.addEventListener("mousemove", event => { gameController.mouseMove(event) });
        window.addEventListener("mousedown", event => { gameController.mouseDown(event) });
    });
}
