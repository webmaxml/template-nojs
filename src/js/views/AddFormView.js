import DomMapper from '../mappers/DomMapper'

class AddFormView extends DomMapper {
  constructor(data) {
    super(data)
  }
}

const addForm = new AddFormView('.add')
export default addForm
