import DomMapper from '../mappers/DomMapper'

class ListItemView extends DomMapper {
  constructor(data) {
    super(data)
  }

  template(data) {
    return `<li class="item">
              <div class="content">${data.title}</div>
              <div class="buttons">
                <button type="button" data-action="change">change</button>
                <button type="button" data-action="move-up">move up</button>
                <button type="button" data-action="move-down">move down</button>
                <button type="button" data-action="remove">remove</button>
              </div>
            </li>`
  }
}

export default ListItemView
