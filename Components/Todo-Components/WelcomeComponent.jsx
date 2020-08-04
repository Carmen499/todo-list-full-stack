import React, {Component} from "react";
import {Link} from 'react-router-dom'
import TodoService from "../../api/TodoService";


export default class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            welcomeMessage: ''

        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse= this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)



    }

    render() {
        return (
            <div className="container">
                <h1>Welcome</h1>
                Welcome {this.props.match.params.username}.
                You can manage your todo List <Link to="/todo">here</Link>

                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage}
                            className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}

                </div>
            </div>


        )

    }


    retrieveWelcomeMessage() {
        // TodoService.executeHelloWorldService()
        // .then( response => this.handleSuccessfulResponse(response))

        // TodoService.executeHelloWorldBeanService()
        //     .then( response => this.handleSuccessfulResponse(response))

        TodoService.executeHelloWorldPathVariableService(this.props.match.params.username)
            .then( response => this.handleSuccessfulResponse(response))
            .catch( error => this.handleError(error))



    }

    handleSuccessfulResponse(response){
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
       // The "data" response received from the console.
        //So we are passing the data within the "state" as a response
        // "welcomeMessage" is an actual object from "state" in the constructor and not a string
        // so  its {welcome: response.data.message} and not just {welcome: response.data} as if a string of data was being passed through


    }

    handleError(error) {
        console.log(error.response)
        this.setState({ welcomeMessage: error.response.data.message})
        //this.setState({welcomeMessage: response.data.message})
    }
}