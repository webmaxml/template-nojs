import DomMapper from '../mappers/DomMapper'

class ListView extends DomMapper {
  constructor(data) {
    super(data)
  }
}

const list = new ListView('.list')
export default list
