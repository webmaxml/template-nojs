
class EventsRepository {
  constructor() {
    this.events = {}
  }

  getEvents() {
    return Object.keys(this.events)
  }

  getCallbacks(event) {
    return this.events[event] || []
  }

  add(event, cb) {
    this.events[event] = this.events[event] || []
    this.events[event].push(cb)
  }

  remove(event, cb) {
    if (event && cb) {
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
}

export default EventsRepository
