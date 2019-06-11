import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import TableStore from '../stores/TableStore';
import TableActions from '../actions/TableActions';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import AddCard from '../components/AddCard';
import AddList from '../components/AddList';
import ShowCardDetails from '../components/ShowCardDetails'
var flag = true;
var App = React.createClass({
    getInitialState: function () {
        if (flag) {
            flag = false;
            setTimeout(function () {
                TableActions.getListFromStorage();
            });
        }
        return TableStore.getState();
    },
    componentDidMount: function () {
        TableStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        TableStore.unlisten(this.onChange);
    },
    onChange: function () {
        this.setState(this.getInitialState());
    },
    submitTask: function (obj, id) {
        obj["id"] = id;
        TableActions.addCard(obj);
    },
    editTask: function (obj, listId, cardId) {
        obj["listId"] = listId;
        obj["cardId"] = cardId;
        TableActions.editCard(obj);
    },
    submitList: function (obj) {
        TableActions.addList(obj);
    },
    removeCard: function (cardId, ListId) {
        console.log(cardId, ListId);
        var obj = {
            cardId: cardId,
            ListId: ListId
        };
        TableActions.deleteCard(obj);
    },
    removeList: function (ListId) {
        TableActions.deleteList(ListId);
    },
    render: function () {
        var data = this.state.data.list;
        var self = this;
        return (
            <div>
                <Row>
                    <Col>
                        <header className="main-header">
                            <div className="title">Task Management Application</div>
                        </header>
                        <div className="board-body">
                            <Row>
                                <Col sm={11} smOffset={1} lg={11} lgOffset={1} md={11} mdOffset={1} xs={11}
                                     xsOffset={1}>
                                    {
                                        data.map(function (Listobject, i) {
                                            return (
                                                <div key={i} className="list">
                                                    <h4 className="status">{Listobject.title}</h4>
                                                    <img
                                                        onClick={self.removeList.bind(null, Listobject.id )}
                                                        className="closeImg" src='https://cdn0.iconfinder.com/data/icons/most-useful-icons/50/CLOSE-512.png'
                                                        alt="closeImg"/>
                                                    {
                                                        Listobject.tasks.map(function (taskObject, j) {
                                                            return (
                                                                <ShowCardDetails editTask={self.editTask}
                                                                                 ListObjectId={Listobject.id}
                                                                                 removeCard={self.removeCard} cardId={j+1}
                                                                                 taskObject={taskObject}
                                                                                 Listobject={Listobject}></ShowCardDetails>
                                                            )
                                                        })
                                                    }
                                                    <footer id={Listobject.id} className="addcard-wrapper">
                                                        <AddCard id={Listobject.id}
                                                                 submitTask={self.submitTask}></AddCard>
                                                    </footer>
                                                </div>
                                            )
                                        })
                                    }
                                    <AddList submitList={self.submitList}></AddList>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
});
module.exports = App;