import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';
var showCardDetails = React.createClass({
    getInitialState: function () {
        return {
            isFormVisible: false,
            username: "",
            status: "",
            description: ""
        }
    },
    changeUsername: function (e) {
        this.setState({
            username: e.target.value
        });

    },
    changeStatus: function (e) {
        this.setState({
            status: e.target.value
        });
    },
    changeDescription: function (e) {
        this.setState({
            description: e.target.value
        });
    },
    emptyState: function () {
        this.setState({
            isFormVisible: false
        });
    },
    submitTask: function () {
        if (this.state.username == "" || this.state.status == "") {
            alert('Please fill these 2 fields');
            this.emptyState();
            return;
        }
        var obj = {
            UserName: this.state.username,
            status: this.state.status,
            description: this.state.description
        };
        this.props.editTask(obj, this.props.ListObjectId, this.props.cardId);
        this.emptyState();
    },
    clickCard: function () {
        this.setState({
            isFormVisible: true,
            username: this.props.taskObject.UserName,
            status: this.props.taskObject.status,
            description: this.props.taskObject.description
        });
    },
    render: function () {
        var isFormVisible = this.state.isFormVisible;
        return (
            <div>
                {
                    isFormVisible
                        ?
                        <div className='card-form'>
                            <form>
                                <input className="detail-input" value={this.state.username}
                                       onChange={this.changeUsername} type="text" required=''
                                       placeholder="Enter Username"/>
                                <input className="detail-input" value={this.state.status} onChange={this.changeStatus}
                                       type="text" required=''
                                       placeholder="Enter Status"/>
                                <textarea id='card_name' value={this.state.description}
                                          onChange={this.changeDescription} type='text' required=''
                                          placeholder="Enter description" rows='3'></textarea>

                                <div className='button-area'>
                                    <button onClick={this.submitTask} type='submit'>Add</button>
                                    <a onClick={this.emptyState} href='#'>cancel</a></div>
                            </form>
                        </div>
                        :
                        <div>
                            <div key={this.props.cardId} className="task">
                                <div className="content">
                                    <h4 className="status">{this.props.taskObject.status}</h4>
                                    <img
                                        onClick={this.props.removeCard.bind(null, this.props.cardId, this.props.Listobject.id )}
                                        className="closeImg" src='https://cdn0.iconfinder.com/data/icons/most-useful-icons/50/CLOSE-512.png'
                                        alt="closeImg"/>
                                    <img
                                        onClick={this.clickCard}
                                        className="closeImg" src='https://cdn1.iconfinder.com/data/icons/turbo-outline/50/Edit-512.png'
                                        alt="editImg"/>
                                    <span className="description">{this.props.taskObject.description}</span>
                                    <h4 className="UserName">{this.props.taskObject.UserName}</h4>
                                </div>
                            </div>
                        </div>
                }
            </div>

        )
    }
});
module.exports = showCardDetails;