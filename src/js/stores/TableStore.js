var TableActions = require('../actions/TableActions');
var alt = require('../alt');

class TableStore {
    constructor() {
        this.bindActions(TableActions);
        this.data = {
            list: [{
                id: 1,
                title: "sample list 1",
                tasks: [{
                    id:1,
                    description: "Sample data 1",
                    UserName: "gautam",
                    status: "test status 1"
                }, {
                    id:2,
                    description: "Sample data 2",
                    UserName: "pahuja",
                    status: "test status 2"
                }]
            }, {
                id: 2,
                title: "sample list 2",
                tasks: [{
                    id:1,
                    description: "Sample data 1",
                    UserName: "gautam",
                    status: "test status 1"
                }, {
                    id:2,
                    description: "Sample data 2",
                    UserName: "pahuja",
                    status: "test status 2"
                }]
            }]
        };
    }

    onAddCard(obj) {
        var list = this.data.list;
        var tasks = this.data.list[obj.id - 1].tasks;
        var id;
        if(tasks.length == 0){
            id = 1;
        } else{
            id = this.data.list[obj.id - 1].tasks.length + 1;
        }
        var dataToPush = {
            id: id,
            description: obj.description,
            UserName: obj.UserName,
            status: obj.status
        };
        for (var i = 0; i < list.length; i++) {
            if (obj.id == list[i].id) {
                list[i].tasks.push(dataToPush);
            }
        }
        console.log(this.data);
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    onDeleteCard(obj) {
        console.log(this.data.list[obj.ListId - 1]);
        this.data.list[obj.ListId - 1].tasks.splice(obj.cardId - 1, 1);
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    onAddList(obj) {
        var id = this.data.list.length + 1;
        var dataToPush = {
            id: id,
            title: obj.status,
            tasks: []
        };
        this.data.list.push(dataToPush);
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    onDeleteList(ListId) {
        this.data.list.splice(ListId - 1, 1);
        this.reAssignId();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    reAssignId(){
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            list[i].id = i+1;
        }
    }

    onEditCard(obj) {
        console.log(obj);
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            if (obj.listId == list[i].id) {
                var tasks = list[i].tasks;
                for (var j = 0; j < tasks.length; j++) {
                    if (obj.cardId == tasks[j].id) {
                        this.data.list[i].tasks[j].description = obj.description;
                        this.data.list[i].tasks[j].UserName = obj.UserName;
                        this.data.list[i].tasks[j].status = obj.status;
                    }
                }
            }
        }
    }

    onGetListFromStorage() {
        if (localStorage.getItem('data') != undefined)
            this.data = JSON.parse(localStorage.getItem('data'));
    }
}

module
    .
    exports = alt.createStore(TableStore, "TableStore");