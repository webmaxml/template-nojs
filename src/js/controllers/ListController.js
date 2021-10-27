import AddFormView from '../views/AddFormView'
import AddInputView from '../views/AddInputView'
import ListView from '../views/ListView'
import ListItemView from '../views/ListItemView'

class ListController {
  constructor() {
    this.addForm = new AddFormView
    this.addInput = new AddInputView
    this.list = new ListView

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  addItem(submitEvent) {
    submitEvent.preventDefault()

    const title = this.addInput.getValue()
    const item = new ListItemView

    item.setContent({ title })
    this.list.append(item)
  }

  removeItem(clickEvent) {

  }
}

export default ListController
