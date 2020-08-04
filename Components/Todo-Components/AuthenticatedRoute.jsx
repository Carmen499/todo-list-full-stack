import React,{Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Route,Redirect} from "react-router-dom"


// this allows the user to not have access to any other links
// without being logged in..it redirects them back to the login page
// to use this, you add "Authenticate" to your route path in your router component
export default class AuthenticationRoute extends Component {
    render() {

            if(AuthenticationService.isUserLoggedIn()) {
               return <Route {...this.props}/>

            }
            else{
               return <Redirect to="/login"/>
            }

    }

}