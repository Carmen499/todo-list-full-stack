package com.todolist.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {

    @Autowired //letting springboot know that the TodoHardcodedService will be used within our controller
    private TodoHardcodedService todoService;


    //http://localhost:8080/users/carmen123/todoList
    @GetMapping("/users/{username}/todoList")
    public List<ToDoListEntity> getAllTodoListItems(@PathVariable String username) {
        return todoService.findAll();

    }

    @DeleteMapping("/users/{username}/todoList/{id}")
    public ResponseEntity<Void> deleteTodoListItem(@PathVariable String username, @PathVariable long id){
        //ResponseEntity returns nothing...Response Entity uses builder pattern

        ToDoListEntity toDoListEntity= todoService.deleteById(id);

        if(toDoListEntity!=null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build(); // NOT found is the famous 404 Response Status

    }

    @GetMapping("/users/{username}/todoList/{id}")
    public ToDoListEntity getTodoListItemById(@PathVariable String username, @PathVariable long id) {
        return todoService.findById(id);

    }

    @PutMapping("/users/{username}/todoList/{id}")
    public ResponseEntity<ToDoListEntity> updateTodoList(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody ToDoListEntity toDoListEntity)  {

       ToDoListEntity toDoListUpdated = todoService.save(toDoListEntity);
        return new ResponseEntity<ToDoListEntity>(toDoListEntity, HttpStatus.OK);

    }

    @PostMapping("/users/{username}/todoList")
    public ResponseEntity<Void> postTodoList(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody ToDoListEntity toDoListEntity){
        ToDoListEntity createdTodoList = todoService.save(toDoListEntity);
        
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/id").buildAndExpand(createdTodoList.getId()).toUri();

        return ResponseEntity.created(uri).build();

    }

}