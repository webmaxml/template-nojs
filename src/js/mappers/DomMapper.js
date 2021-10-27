import EventsRepository from '../classes/EventsRepository'

class DomMapper {
  constructor(options = {}) {
    if (this.constructor.inst) { return this.constructor.inst }
    if (options.singleton) { this.constructor.inst = this }
    if (options.selector) { this.get(options.selector) }

    this.events = new EventsRepository
  }

  get(selector) {
    const elem = document.querySelector(selector)

    this.attrs = {}
    this.elem = elem
    this.tag = elem.tagName

    elem.getAttributeNames().forEach(name => {
      this.attrs[name] = elem.getAttribute(name)
    })
  }

  setContent(content) {
    this.content = content
  }

  getValue() {
    return this.elem.value
  }

  getEvents() {
    return this.events.getEvents()
  }

  on(event, cb) {
    this.elem.addEventListener(event, cb)
    this.events.add(event, cb)
  }

  off(event, cb) {
    this.elem.removeEventListener(event, cb)
    this.events.remove(event, cb)
  }

  offEvent(event) {
    this.events.getCallbacks(event).forEach(cb => this.elem.removeEventListener(event, cb))
    this.events.removeEvent(event)
  }

  offAll() {
    this.events.getEvents().forEach(event => this.offEvent(event))
  }

  append(view) {
    this.elem.insertAdjacentHTML('beforeend', view.template())
  }

  remove() {
    this.elem.parentElement.removeChild(this.elem)
  }
}


export default DomMapper
