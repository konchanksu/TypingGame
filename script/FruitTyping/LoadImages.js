/**
 * イメージを全て保管するクラス
 */
class Images {
    static images = {};
    static complete = 0;

    static imageAppend(src, name) {
        Images.images[name] = new Image();
        Images.images[name].src = src;
        return Images.images[name];
    }

    static getImage(name) {
        return Images.images[name];
    }

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
    const srcNameList = [["/static/img/aikotoba.png", "aikotoba"],
                         ["/static/img/aikotoba_input.png", "aikotoba_input"],
                         ["/static/img/attack.png", "attack"],
                         ["/static/img/button/decision/decision.png", "decision"],
                         ["/static/img/button/decision/decision_down.png", "decision_down"],
                         ["/static/img/button/decision/decision_hover.png", "decision_hover"],
                         ["/static/img/button/multi_play/multi_play.png", "multi_play"],
                         ["/static/img/button/multi_play/multi_play.png", "multi_play_down"],
                         ["/static/img/button/multi_play/multi_play_hover.png", "multi_play_hover"],
                         ["/static/img/button/setting/setting.png", "setting"],
                         ["/static/img/button/setting/setting.png", "setting_down"],
                         ["/static/img/button/setting/setting_hover.png", "setting_hover"],
                         ["/static/img/button/single_play/single_play.png", "single_play"],
                         ["/static/img/button/single_play/single_play.png", "single_play_down"],
                         ["/static/img/button/single_play/single_play_hover.png", "single_play_hover"],
                         ["/static/img/button/undo/undo.png", "undo"],
                         ["/static/img/button/undo/undo_down.png", "undo_down"],
                         ["/static/img/button/undo/undo_hover.png", "undo_hover"],
                         ["/static/img/character/character1/character1_box.png", "character1_box"],
                         ["/static/img/character/character1/character1_box_down.png", "character1_box_down"],
                         ["/static/img/character/character1/character1_box_hover.png", "character1_box_hover"],
                         ["/static/img/character/character1/character1_box_hover_chara.png", "character1_box_hover_chara"],
                         ["/static/img/character/character1/pekora.png", "pekora"],
                         ["/static/img/character/character2/character2_box.png", "character2_box"],
                         ["/static/img/character/character2/character2_box_down.png", "character2_box_down"],
                         ["/static/img/character/character2/character2_box_hover.png", "character2_box_hover"],
                         ["/static/img/character/character2/character2_box_hover_chara.png", "character2_box_hover_chara"],
                         ["/static/img/character/character2/mio.png", "mio"],
                         ["/static/img/frame.png", "frame"],
                         ["/static/img/lose.png", "lose"],
                         ["/static/img/nickname.png", "nickname"],
                         ["/static/img/nickname_input.png", "nickname_input"],
                         ["/static/img/title.png", "title"],
                         ["/static/img/wait.png", "wait"],
                         ["/static/img/win.png", "win"]
    ]

    const promises = srcNameList.map(([src, name]) => Images.loadImage(src, name))
    Promise.all(promises)
    .then(() => {
        gameController.makeEachWindow();
    }).then(() => {
        gameController.moveToTitlePage();
    }).then(() => {
        window.addEventListener("keydown", event => { gameController.keyDown(event) });
        window.addEventListener("click", event => { gameController.onClick(event) });
    });
}
