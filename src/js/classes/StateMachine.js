// <<{ EventListener

class EventListener {
  constructor() {
    this.events = {}
    this.eventsOnce = {}
  }

  on(event, cb) {
    this.events[event] = this.events[event] || []
    this.events[event].push(cb)
  }

  once(event, cb) {
    this.eventsOnce[event] = this.eventsOnce[event] || []
    this.eventsOnce[event].push(cb)
  }

  off(event, cb) {
    if (event && cb ) {
      if (!this.events[event]) { return }

      const i = this.events[event].indexOf(cb)
      if (i !== -1) { this.events[event].splice(i, 1) }
      return 
    }

    if (event) { 
      delete this.events[event] 
      return
    }

    this.events = {}
  }

  trigger(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(...args))
    }

    if (this.eventsOnce[event]) {
      this.eventsOnce[event].forEach(cb => cb(...args))
      delete this.eventsOnce[event]
    }
  }
}

// }>>

// <<{ StateMachine

class StateMachine {
  constructor() {
    this.currentState = null
    this.handler = null
  }

  go(state, ...args) {
    if (this.currentState === state) { return }
    if (!this.states[state]) { throw new Error(`No such state - '${state}'`) }
    if (!this.isAllowedTransition(state)) { 
      throw new Error(`Not allowed transition from '${this.currentState}' to '${state}'`)
    }
    if (this.handler) { this.handler.onExit() }

    this.currentState = state
    this.handler = this.states[this.currentState]

    this.handler.onEnter(...args)
  }

  isAllowedTransition(state) {
    if (!this.restrictions || !this.restrictions[this.currentState]) { return true }
    return this.restrictions[this.currentState].includes(state)
  }

}

// }>>

export default StateMachine
