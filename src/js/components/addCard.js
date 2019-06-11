import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';

var addCard = React.createClass({
    getInitialState: function () {
        return {
            isFormVisible: false,
            username: "",
            status: "",
            description: ""
        }
    },

    showForm: function () {
        this.setState({
            isFormVisible: true
        });
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
            isFormVisible: false,
            username: "",
            status: "",
            description: ""
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
        this.props.submitTask(obj, this.props.id);
        this.emptyState();
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
                                <input className="detail-input" onChange={this.changeUsername} type="text" required=''
                                       placeholder="Enter Username"/>
                                <input className="detail-input" onChange={this.changeStatus} type="text" required=''
                                       placeholder="Enter Status"/>
                                <textarea id='card_name' onChange={this.changeDescription} type='text' required=''
                                          placeholder="Enter description" rows='3'></textarea>

                                <div className='button-area'>
                                    <button onClick={this.submitTask} type='submit'>Add</button>
                                    <a onClick={this.emptyState} href='#'>cancel</a></div>
                            </form>
                        </div>
                        :
                        <span onClick={this.showForm} className="addcard">Add New Card..</span>
                }
            </div>

        )
    }
});
module.exports = addCard;