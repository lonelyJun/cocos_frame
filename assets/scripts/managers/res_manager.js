let res_mgr = cc.Class({
  extends: cc.Component,

  statics: {
    Instance: null
  },

  properties: {
    lancher_prefabs: {
      type: cc.Prefab,
      default: []
    },
    lancher_sprite_frames: {
      type: cc.SpriteFrame,
      default: []
    },
    lancher_audio_clips: {
      type: cc.AudioClip,
      default: []
    },
    lancher_sprite_atlases: {
      type: cc.SpriteAtlas,
      default: []
    }
  },


  onLoad() {
    //单例判断
    if (res_mgr.Instance == null) {
      res_mgr.Instance = this;
    } else {
      cc.error("[error]:res_mgr have multiple instance");
      this.destroy();
      return;
    }
  },

  start() {

  },

  //    res_set: {prefabs: [],sprite_frames: [],audio_clips: [],sprite_atlases: []}
  //    on_progress(pre) //返回进度函数
  //    on_load_finished()   //成功后回调
  preload_res_pkg(res_set, on_progress, on_load_finished) {
    this.res_set = res_set;
    //计算数量
    this.totalNum = 0;
    //计算包总数
    for (let key in res_set) {
      this.totalNum += res_set[key].length;
    }

    //如果没有资源，直接处理
    if (this.totalNum == 0) {
      if (on_load_finished) {
        on_load_finished();
      }
      return;
    }
    //分批处理
    let curIndex = 0;
    for (let key in res_set) {
      res_set[key].forEach(item => {
        let url = item;
        cc.loader.loadRes(url, (err, obj) => {
          curIndex++
          if (err) {
            cc.error('[资源处理失败]:' + err);
          }
          if (on_progress) {
            on_progress(curIndex / this.totalNum);
          }
          if (curIndex >= this.totalNum && on_load_finished) {
            on_load_finished();
          }
        });
      });

    }
  },
  //释放资源
  release_res_pkg(res_set) {
    if (res_set.sprite_frames && res_set.sprite_frames.length > 0) {
      cc.loader.release(res_set.sprite_frames)
    }
    if (res_set.audio_clips && res_set.audio_clips.length > 0) {
      cc.loader.release(res_set.audio_clips)
    }
    if (res_set.sprite_atlase && res_set.sprite_atlase.length > 0) {
      cc.loader.release(res_set.sprit_atlase)
    }
    if (res_set.prefabs && res_set.prefabs.length > 0) {
      res_set.prefabs.forEach(prefab => {
        let deps = cc.loader.getDependsRecursively(prefab); //获取预制体依赖
        cc.loader.release(deps)
        cc.loader.release(prefab)
      })
    }
  },
  //返回资源
  get_res(url) {
    return cc.loader.getRes(url);
  },

  // update (dt) {},
});