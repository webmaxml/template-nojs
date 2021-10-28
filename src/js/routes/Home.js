import listController from '../controllers/ListController'

import addForm from '../views/AddFormView'
import list from '../views/ListView'

class Home {
  constructor(router) { 
    this.router = router 
  }

  onEnter() {
    this.router.addEvent('addTask', 'submit', 'listController:addItem').activate(addForm)
    this.router.addEvent('taskClick', 'click', 'listController:itemClickHandler')

    const promise = new Promise(resolve => {
      throw 'aaaaaaaaaaaaa'
    })

    this.router.addPromise('test', 'error', 'listController:itemClickHandler')

    this.router.activate('test', promise)
  }

  onExit() {
    addForm.off()
  }
}

export default Home

