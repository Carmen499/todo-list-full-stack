import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import TodoListComponent from "./TodoListComponent";
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from "./FooterComponent";
import LoginComponent from './LoginComponent.jsx';
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from './WelcomeComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import UpdateTodoListComponent from "./UpdateTodoListComponent";



export default class TodoAppRouter extends Component {
    render() {
        return (
            <div className="todoApp">
                <Router>
                    <HeaderComponent/>
                        <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:username" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todo/:id" component={UpdateTodoListComponent}/>
                        <AuthenticatedRoute path="/todo" component={TodoListComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>

                        <Route component={ErrorComponent}/>
                        </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}













