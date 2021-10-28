import router from '../classes/Router'
import addForm from '../views/AddFormView'
import addInput from '../views/AddInputView'
import list from '../views/ListView'
import ListItemView from '../views/ListItemView'

class ListController {

  addItem(submitEvent) {
    submitEvent.preventDefault()

    const title = addInput.getValue()
    const item = list.append(new ListItemView({ title }))

    router.activate('taskClick', item)
  }

  itemClickHandler(clickEvent) {
    console.log(clickEvent)
  }
}

const listController = new ListController
export default listController
