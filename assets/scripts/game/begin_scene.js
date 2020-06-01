let res_mgr = require("../managers/res_manager");
let UI_mgr = require("../managers/UI_manager.js");
let sound_mgr = require("../managers/sound_manager")

// 标准资源包的格式;
let res_pkg = {
  prefabs: [
    "prefabs/player",
  ],

  sprite_frames: [],

  audio_clips: ["sounds/bgm_scene2", "sounds/sfx_collect"],

  sprite_atlases: [],
};

let scene = {
  preload(on_process, on_finished) {
    // 你还可以装载其它的资源包
    // end
    res_mgr.Instance.preload_res_pkg(res_pkg, on_process, on_finished);
  },

  enter() {
    this.canvas = cc.find("Canvas")
    if (this.canvas == null) {
      cc.error("[game app]:canvas is null")
    }

    this.ui = UI_mgr.show_ui_at(this.canvas, "player")
    // let ui = cc.instantiate(res_mgr.Instance.get_res("prefabs/player"));
    // this.canvas.addChild(ui);
    // this.ui = ui;
    sound_mgr.Instance.play_music('sounds/bgm_scene2', true);
    sound_mgr.Instance.play_effect('sounds/sfx_collect');
  },

  // 删除当前场景的数据,
  // bRelease:是否执行资源卸载; // 同一个场景切换的时候，可能不用卸载资源
  // bRelease一般为true,只有同一个场景切换到新的自己这个场景，为false;
  destroy(bRelease) {
    // this.ui.removeFromParent()
    // 卸载哪些资源包由你自己根据游戏决定;
    if (bRelease) {
      // 你要释放的资源包;
      res_mgr.Instance.release_res_pkg(res_pkg);

    }
  },
};

module.exports = scene;