import axios from 'axios'


class TodoService {

    retrieveAllTodoListItems(username) {
        return axios.get(`http://localhost:8080/users/${username}/todoList`)

        // .then(response => console.log(response))  // if the request goes through this will execute
        // note that the "promise .then and .catch" can only be called in one place (welcome component)  or here
        // in axios service component... do not call them in 2 places at once. or there will be any error
    }

    deleteTodoListItem(name, id){
        return axios.delete(`http://localhost:8080/users/${name}/todoList/${id}`)
    }

    retrieveToDoListItem(name, id){
        return axios.get(`http://localhost:8080/users/${name}/todoList/${id}`)
    }
    updateTodoListItem(name, id, todoList){
        return axios.put(`http://localhost:8080/users/${name}/todoList/${id}`, todoList)
    }

    createTodoListItem(name,todoList){
        return axios.post(`http://localhost:8080/users/${name}/todoList/`, todoList)
    }

}

export default new TodoService();