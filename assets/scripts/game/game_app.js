let game_mgr = require("../managers/game_manager.js");
// let event_mgr = require("../managers/event_manager.js");
// let res_mgr = require("../managers/res_manager");
let begin_scene = require("begin_scene.js");
let sound_mgr = require("../managers/sound_manager")

let game_app = cc.Class({
  extends: game_mgr,

  statics: {
    Instance: null
  },

  properties: {},

  onLoad() {
    //单例判断
    if (game_app.Instance == null) {
      game_app.Instance = this;
    } else {
      cc.error("[error]:game_app have multiple instance");
      this.destroy();
      return;
    }
    //调用game_mgr加载器
    game_mgr.prototype.onLoad.call(this);
  },

  start() {
    // let pkg = {
    //   prefabs: ["prefabs/player"],
    //   sprite_frames: ["testRes/people"]
    // }
    // //加载资源
    // res_mgr.Instance.preload_res_pkg(pkg,
    //   (per) => {
    //     console.log(per)
    //   },
    //   () => {
    //     console.log(
    //       'finish'
    //     )
    //   }
    // );

    // //删除资源
    // this.scheduleOnce(() => {
    //   res_mgr.Instance.release_res_pkg(pkg);
    // }, 5)

    //启动加载
    this.enter_scene(begin_scene);
    // this.scheduleOnce(() => {
    //   this.enter_scene(begin_scene);
    // }, 5)

    this.scheduleOnce(() => {
      sound_mgr.Instance.stop_music('sounds/bgm_scene2')
    }, 5)

    //进入场景
    // this.enter_login_scene()
    // event_mgr.dispatch_event('begin', 'hello World!')
  },

  //下方添加逻辑代码

  // enter_login_scene() {
  //   event_mgr.add_event_listener('begin', this, this.on_begin_call)
  //   event_mgr.add_event_listener('begin', this, this.on_begin_call)
  // },

  // on_begin_call(event_name, udata) {
  //   console.log('on_begin_call:' + event_name + ',' + udata);
  // },

  // enter_home_scene() {

  // },

  // enter_game_scene() {

  // },

  // update (dt) {},
});