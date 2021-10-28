import EventsRepository from '../classes/EventsRepository'

class DomMapper {
  constructor(data) {
    const isSelector = typeof data === 'string'
    const isElement = data instanceof HTMLElement
    const isContent = Object.prototype.toString.call(data) === '[object Object]'

    if (isSelector) { this.fill(document.querySelector(data)) }
    if (isElement) { this.fill(data) }
    if (isContent) { 
      const parser = new DOMParser
      const doc = parser.parseFromString(this.template(data), 'text/html')
      const elem = doc.body.removeChild(doc.body.firstChild)

      this.fill(elem)
    }

    this.events = new EventsRepository
  }

  fill(elem) {
    this.elem = elem
    this.tag = elem.tagName
    this.attrs = {}

    elem.getAttributeNames().forEach(name => {
      this.attrs[name] = elem.getAttribute(name)
    })
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
    if (event && cb) {
      this.elem.removeEventListener(event, cb)
      this.events.remove(event, cb)
      return
    }

    if (event) {
      this.events.getCallbacks(event).forEach(cb => this.elem.removeEventListener(event, cb))
      this.events.remove(event)
      return
    }

    this.events.getEvents().forEach(event => this.off(event))
  }

  append(view) {
    this.elem.insertAdjacentElement('beforeend', view.elem)
    return view
  }

  remove() {
    this.elem.parentElement.removeChild(this.elem)
  }
}


export default DomMapper
