import Router from './classes/Router'

import ListController from './controllers/ListController'

import AddFormView from './views/AddFormView'
import ListView from './views/ListView'

const router = new Router

const listController = new ListController

const addForm = new AddFormView
const list = new ListView

router.home.add(addForm, 'submit', listController.addItem)

