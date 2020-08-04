import React, {Component} from "react";
import TodoService from "../../api/TodoService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

export default class ListTodoComponent extends Component{
    _isMounted = false; // this fixed the warning error in the console"A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            todo:[],
            message: null   // set it to null and not an empty message to ensure the alert doesnt show by default


        }
        this.deleteTodoListItemClicked = this.deleteTodoListItemClicked.bind(this)
        this.refreshTodoList= this.refreshTodoList.bind(this)
        this.updateTodoList = this.updateTodoList.bind(this)
        this.addTodoListItem = this.addTodoListItem.bind(this)

    }
                //this actually puts the component on the browser..it makes the call to the api to display the state
    componentDidMount() {
        this._isMounted = true // bug fix for changing a controlled input of type text to be uncontrolled
        console.log('componentDidMount')
        this.refreshTodoList();// this refreshes the page once an item has been updated, deleted, etc

    }

    componentWillUnmount(){
        this._isMounted = false; // bug fix for warning in the console.
    }


    refreshTodoList(){
        let username=AuthenticationService.getLoggedInUserName()    //The user name will be retrieved from the authentication service(login validation)
        TodoService.retrieveAllTodoListItems(username)
            .then(
                response =>{
                    if(this._isMounted) {
                        this.setState({todo: response.data})//this displays your list!
                    }
                        this.refreshTodoList();

                    //console.log(response)
                }

            )


    }

    deleteTodoListItemClicked(id){
        let username=AuthenticationService.getLoggedInUserName() //component that assist with login and logouts
        //console.log(id + " " + username);
        TodoService.deleteTodoListItem(username,id)
            .then(
                response =>{
                    this.setState({ message: `Deleted Todo List item at id: ${id}`})
                }
            )


    }
    addTodoListItem() {
        console.log("item added")
        this.props.history.push(`/todo/-1`) // "-1" signifies that a new item will be added
    }
    updateTodoList(id){
        console.log("updated id" + " "+ id)
        this.props.history.push(`/todo/${id}`)
        // let username=AuthenticationService.getLoggedInUserName() //component that assist with login and logouts
        // //console.log(id + " " + username);
        // TodoService.deleteTodoListItem(username,id)
        //     .then(
        //         response =>{
        //             this.setState({ message: `Deleted Todo List item at id: ${id}`})
        //         }
        //     )


    }


    render(){
        console.log('render')
        return <div>
            <h1>Todo List</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

            {/*this allows for the alert to only show if something has been deleted successfully*/}
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is it Done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.todo.map (
                        todo =>
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()} </td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className = "btn btn-warning"
                                            onClick={() => this.deleteTodoListItemClicked(todo.id)}>Delete</button></td>
                                <td><button className = "btn btn-success"
                                            onClick={() => this.updateTodoList(todo.id)}>Update</button></td>
                            </tr>
                    )
                    }
                    </tbody>
                </table>
                <div className="row">
                    <button className= "btn btn-success" onClick={this.addTodoListItem}>Add Todo List Item</button>
                </div>
            </div>
        </div>
    }



}