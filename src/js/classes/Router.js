import StateMachine from './StateMachine'

import Home from '../routes/Home'

import listController from '../controllers/ListController'

// <<{ Router

class Router extends StateMachine {
  constructor() {
    super()
    this.actions = {}
    this.states = {
      home: new Home(this),
    }
    
    this.go('home')
  }

  addEvent(action, event, cbString) {
    return this.actions[action] = new EventAction(event, new Callback(cbString))
  }

  addPromise(action, event, cbString) {
    return this.actions[action] = new PromiseAction(event, new Callback(cbString))
  }

  activate(action, data) {
    this.actions[action].activate(data)
  }
}

// }>>

// <<{ Callback

class Callback {
  constructor(string) {
    this.sep = ':'
    this.controllers = {
      listController,
    }

    const i = string.indexOf(this.sep)
    const controllerName = string.slice(0, i)
    const cbName = string.slice(i + 1)

    const controller = this.controllers[controllerName]
    if (!controller) { throw new Error(`No such controller - '${controllerName}`) }

    this.cb = controller[cbName].bind(controller)
  }

  getCb() {
    return this.cb
  }
}

// }>>

// <<{ Actions

class EventAction {
  constructor(event, callback) {
    this.event = event
    this.callback = callback
  }

  activate(view) {
    view.on(this.event, this.callback.getCb())
    this.view = view
  }
}

class PromiseAction {
  constructor(event, callback) {
    this.successEvent = 'success'
    this.errorEvent = 'error'

    if (event !== this.successEvent && event !== this.errorEvent) {
      throw new Error(`Event in promise action must be either '${this.successEvent}' or '${this.errorEvent}'`)
    }

    this.event = event
    this.callback = callback
  }

  activate(promise) {
    switch (this.event) {
      case this.successEvent: promise.then(this.callback.getCb()); break;
      case this.errorEvent: promise.catch(this.callback.getCb()); break;
    }
  }
}

// }>>

const router = new Router
export default router
