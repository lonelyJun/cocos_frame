let EFFECT_NUM = 8;
let DEFAULT_VOLUME = 1;
let res_mgr = require("./res_manager");
let sound_manager = cc.Class({
  extends: cc.Component,

  statics: {
    Instance: null
  },

  properties: {},

  onLoad() {
    //单例判断
    if (sound_manager.Instance == null) {
      sound_manager.Instance = this;
    } else {
      cc.error("[error]:sound_manager have multiple instance");
      this.destroy();
      return;
    }

    //读取本地参数 0不静音 1静音
    this.music_mute = cc.sys.localStorage.getItem("music_mute");
    this.music_mute = (!this.music_mute) ? 0 : this.music_mute;
    this.effect_mute = cc.sys.localStorage.getItem("effect_mute");
    this.effect_mute = (!this.effect_mute) ? 0 : this.effect_mute;

    this.music_volume = cc.sys.localStorage.getItem("music_volume");
    this.music_volume = (!this.music_volume) ? 0 : this.music_volume;
    this.effect_volume = cc.sys.localStorage.getItem("effect_volume");
    this.effect_volume = (!this.effect_volume) ? 0 : this.effect_volume;
    //end

    this.music_as = this.node.addComponent(cc.AudioSource);
    this.music_as.mute = (this.music_mute == 1);
    this.music_as.volume = this.music_volume;
    this.effect_as = [];
    for (let i = 0; i < EFFECT_NUM; i++) {
      let as = this.node.addComponent(cc.AudioSource)
      this.effect_as.push(as);
      as.mute = (this.effect_mute == 1);
      as.volume = this.effect_volume;
    }
    this.cur_as = 0;
  },

  start() {

  },

  get_music_mute() {
    return this.music_mute;
  },

  set_music_mute(b_mute) {
    let value = b_mute ? 1 : 0;
    if (this.music_mute == value) {
      return;
    }

    this.music_mute = value;
    this.music_as.mute = value;

    cc.sys.localStorage.setItem('music_mute', value)
  },

  get_effect_mute() {
    return this.effect_mute;
  },

  set_effect_mute(b_mute) {
    let value = b_mute ? 1 : 0;
    if (this.effectc_mute == value) {
      return;
    }

    for (let i = 0; i < this.effect_as.length; i++) {
      this.effect_as[i].mute = value;
    }

    this.effect_mute = value;
    cc.sys.localStorage.setItem('effect_mute', value)
  },

  get_music_volume() {
    return this.music_volume;
  },

  set_music_volume(value) {
    if (this.music_volume == value) {
      return;
    }

    this.music_volume = value;
    this.music_as.volume = value;

    cc.sys.localStorage.setItem('music_volume', value)
  },

  get_effect_volume() {
    return this.effect_volume;
  },

  set_effect_volume(value) {
    if (this.effectc_volume == value) {
      return;
    }

    for (let i = 0; i < this.effect_as.length; i++) {
      this.effect_as[i].volume = value;
    }

    this.effect_volume = value;
    cc.sys.localStorage.setItem('effect_volume', value)
  },

  play_music(url, loop) {

    let loopFlag = loop ? true : false;
    this.music_as.loop = loopFlag;
    this.music_as.clip = res_mgr.Instance.get_res(url);
    let volume = cc.sys.localStorage.getItem("music_volume");
    this.music_as.volume = volume ? volume : DEFAULT_VOLUME;
    if (this.music_as.clip) {
      this.music_as.play();
    } else {
      cc.error("music audio clip is null:" + url);
    }
  },

  stop_music() {
    this.music_as.stop();
  },

  play_effect(url) {
    let as = this.effect_as[this.cur_as];
    this.cur_as++;
    if (this.cur_as >= EFFECT_NUM) {
      this.cur_as = 0;
    }
    as.clip = res_mgr.Instance.get_res(url);
    let volume = cc.sys.localStorage.getItem('effect_volume');
    as.volume = volume ? volume : DEFAULT_VOLUME;

    if (as.clip) {
      as.play();
    } else {
      cc.error("effect audio clip is null:" + url);
    }
  },

  // update (dt) {},
});