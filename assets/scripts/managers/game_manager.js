let event_mgr = require('./event_manager');
let sound_manager = require("./sound_manager");

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    cc.log("init framework .....")
    //加入初始化代码
    event_mgr.init();
    this.addComponent('sound_manager')
    cc.log("init framework successful")
    this.cur_scene = null;
  },

  start() {},

  enter_scene(scene) {
    if (scene == null) {
      return;
    }
    if (this.cur_scene !== null) {
      this.cur_scene.destroy(this.cur_scene !== scene);
    }
    this.cur_scene = scene;

    scene.enter();
  },

  preload_scene(scene, on_process, on_finished) {
    scene.preLoad(on_process, on_finished)
  }


  // update (dt) {},
});