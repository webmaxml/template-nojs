import DomMapper from '../mappers/DomMapper'

class AddInputView extends DomMapper {
  constructor(selector = '.add-input') {
    super({ selector, singleton: true })
  }
}

export default AddInputView
