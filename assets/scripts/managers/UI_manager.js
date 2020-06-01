let res_mgr = require("res_manager.js")
let UI_manager = {
  show_ui_at(parent, ui_name) {
    let prefab = res_mgr.Instance.get_res("prefabs/" + ui_name);
    let item = null;
    if (prefab) {
      cc.loader.loadRes("prefabs/" + ui_name, (err, prefab) => {
        item = cc.instantiate(prefab);
        parent.addChild(item);
        item.addComponent(ui_name + '_ctrl');
      })
    }
    return item;
  }
}

module.exports = UI_manager;