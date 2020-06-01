var event_manager = {
  event_map: {

  },

  init() {

  },
  //func(event_name,udata)
  add_event_listener(event_name, caller, func) {
    if (!this.event_map[event_name]) {
      this.event_map[event_name] = [];
    }
    let event_quence = this.event_map[event_name];
    event_quence.push({
      caller,
      func
    })
  },
  remove_event_listener(event_name, caller, func) {
    if (!this.event_map[event_name]) {
      return;
    }
    let event_quence = this.event_map[event_name];

    let index = event_quence.findIndex(o => o.caller == caller && o.func == func);
    if (index != -1) {
      event_quence.splice(index, 1);
    }
    if (this.event_map[event_name].length <= 0) {
      this.event_map[event_name] == null;
    }
  },
  dispatch_event(event_name, udata) {
    if (!this.event_map[event_name]) {
      return;
    }
    let event_quence = this.event_map[event_name];
    event_quence.forEach(o => {
      o.func.call(o.caller, event_name, udata);
    })
  }
}

module.exports = event_manager;