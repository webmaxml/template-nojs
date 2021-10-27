import DomMapper from '../mappers/DomMapper'

class AddFormView extends DomMapper {
  constructor(selector = '.add') {
    super({ selector, singleton: true })
  }
}

export default AddFormView
