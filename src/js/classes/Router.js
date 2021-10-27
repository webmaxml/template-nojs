
class Router {
  constructor() {
    if (this.constructor.inst) { return this.constructor.inst }
    this.constructor.inst = this

    this.home = new Home
  }

  add(view, event, cb) {
    view.on(event, cb)
  }

}


class Home extends Router {
}

export default Router
