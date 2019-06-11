var Alt = require('../alt');

class TableActions{
    constructor(){
        this.generateActions(
            'addCard',
            'deleteCard',
            'editCard',
            'addList',
            'deleteList',
            'getListFromStorage'
        )
    }
}
module.exports = Alt.createActions(TableActions);