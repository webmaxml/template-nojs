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
  }

  go(state, ...args) {
    if (this.currentState === state) { return }
    if (!this.states[state]) { throw new Error(`No such state - '${state}'`) }
    if (!this.isAllowedTransition(state)) { 
      throw new Error(`Not allowed transition from '${this.currentState}' to '${state}'`)
    }
    if (this.states[this.currentState]) { this.states[this.currentState].onExit() }

    this.currentState = state
    this.states[this.currentState].onEnter(...args)
  }

  isAllowedTransition(state) {
    const restrictions = this.restrictions[this.currentState]

    if (!restrictions) { return true }
    return restrictions.includes(state)
  }

}



class State {
  constructor() {
  }
}

// }>>

// <<{ Test

class Test extends StateMachine {
  constructor() {
    super()
    this.states = {
      red: new Red(this),
      green: new Green(this),
      blue: new Blue(this),
    }
    this.restrictions = {
      green: ['blue', 'red'],
      blue: ['red'],
      red: ['green'],
    }

    this.go('green')
  }
}

class Red extends State {
  constructor(machine) { 
    super()
    this.machine = machine 
  }

  onEnter() { console.log('red enter') }
  onExit() { console.log('red leave') }
}

class Green extends State {
  constructor(machine) { 
    super()
    this.machine = machine 
  }

  onEnter() { console.log('green enter') }
  onExit() { console.log('green leave') }
}

class Blue extends State {
  constructor(machine) { 
    super()
    this.machine = machine 
  }

  onEnter() { console.log('blue enter') }
  onExit() { console.log('blue leave') }
}

const test = new Test


// }>>
