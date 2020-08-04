import React, {Component} from 'react'
import moment from 'moment'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import TodoService from "../../api/TodoService";
import AuthenticationService from "./AuthenticationService";


export default class UpdateTodoListComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            id: this.props.match.params.id,
            description:"",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
            // you can install "moment in react and it helps with date formatting

        }
        this.onSubmit= this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if(this.state.id === -1){
            return
        }
        let username = AuthenticationService.getLoggedInUserName()
        TodoService.retrieveToDoListItem(username, this.state.id)
            .then(response => this.setState({description: response.data.description,
            targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")}))
    }

    validate(values){  //validates the values within the form... to ensure dates are actual dates etc.
        let errors ={}   //empty object called errors
        if(!values.description){
            errors.description ="Please enter a description"
        }else if(values.description.length <5){
            errors.description ="Enter at least 5 characters in description"
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate="Enter a valid Date"
        }
        return errors
    }


    onSubmit(values){ // submit values entered inside of the form
        let username = AuthenticationService.getLoggedInUserName()
        let todoList = {id: this.state.id,
            description: values.description,
            targetDate: values.targetDate, }


        if(this.state.id === -1){    // if item Id is -1 as in creating a new todolist item, the post axios method will be called otherwise the update axios method will be called
            TodoService.createTodoListItem(username, todoList) // passing in an object "todoList" stating what value need to be updated
                .then(() => {this.props.history.push(`/todo`)}) //pushes back to todoLIst

        } else {

            TodoService.updateTodoListItem(username, this.state.id, todoList) // passing  in an object "todoList" stating what value need to be updated(this comes from the @request body parameter within the put api method) along with its parameters)
                .then(() => {this.props.history.push(`/todo`)}) //pushes back to todoLIst

        }

    }

    render() {
        let {description, targetDate} = this.state   //handles the initial values within the formik from table

        return(
        <div>
            <h1>Todo List Item</h1>
            <div className="container">
                <Formik
                    initialValues={{description, targetDate}}
                    onSubmit={this.onSubmit}    // form submission handler
                    validateOnChange={false}   //this keeps the error message from populating by default and only when the save button is clicked. User for when you need to validate OnChange events and related methods
                    validateOnBlur={false}     //this keeps the error message from populating by default and only when the save button is clicked. Useful for when you need to validate whether an input has been touched or not
                    validate={this.validate}
                    enableReinitialize={true}  //Control whether formik should reset the form if initialValues changes

                >
                    {
                        (props) =>(
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>

                            )
                    }

                </Formik>
            </div>
        </div>
        )

    }

}