import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';

var addList = React.createClass({
    getInitialState: function () {
        return {
            isFormVisible: false,
            status: ""
        }
    },

    showForm: function () {
        this.setState({
            isFormVisible: true
        });
    },

    changeStatus: function (e) {
        this.setState({
            status: e.target.value
        });
    },
    emptyState: function () {
        this.setState({
            isFormVisible: false,
            status: ""
        });
    },
    submitList: function () {
        if (this.state.status == "") {
            alert('Please fill status');
            this.emptyState();
            return;
        }
        var obj = {
            status: this.state.status
        };
        this.props.submitList(obj);
        this.emptyState();
    },
    render: function () {
        var isFormVisible = this.state.isFormVisible;
        return (
            <div className="new-list">
                {
                    isFormVisible
                        ?
                        <div className='list-form'>
                            <form>
                                <input className="detail-input" onChange={this.changeStatus} type="text" required=''
                                       placeholder="Add a new list..."/>
                                <div className='button-area'>
                                    <button onClick={this.submitList} type='submit'>Save list</button>
                                    <a onClick={this.emptyState} href='#'>cancel</a></div>
                            </form>
                        </div>
                        :
                        <div className="add-new-list" onClick={this.showForm}>Add new list...</div>
                }
            </div>

        )
    }
});
module.exports = addList;