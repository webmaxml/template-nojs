import DomMapper from '../mappers/DomMapper'

class AddInputView extends DomMapper {
  constructor(data) {
    super(data)
  }
}

const addInput = new AddInputView('.add-input')
export default addInput
