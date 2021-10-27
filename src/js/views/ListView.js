import DomMapper from '../mappers/DomMapper'

class ListView extends DomMapper {
  constructor(selector = '.list') {
    super({ selector, singleton: true })
  }
}

export default ListView
