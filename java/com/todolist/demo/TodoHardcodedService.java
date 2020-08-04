package com.todolist.demo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service   // letting Spring boot know this is a service within our controller
public class TodoHardcodedService {

    private static List <ToDoListEntity> todoList = new ArrayList<>();
    private static int idCounter = 0;

    static{
        todoList.add(new ToDoListEntity(++idCounter, "carmen123", "Learn to Dance", new Date(), false));
        todoList.add(new ToDoListEntity(++idCounter, "carmen123", "Learn Spanish", new Date(), false));
        todoList.add(new ToDoListEntity(++idCounter, "carmen123", "Learn to Skate", new Date(), false));

    }

    public List <ToDoListEntity> findAll(){
        return todoList;
    }

    public ToDoListEntity save(ToDoListEntity toDoListEntity){ // save method is for updates(update components on front end) and inserts in JPA
        if(toDoListEntity.getId() == -1 || toDoListEntity.getId()==0){
            toDoListEntity.setId(++idCounter);  //incrementing the assigned id (not needed if auto generated id while using MySql and Hibernate)
            todoList.add(toDoListEntity);

        }else{
            deleteById(toDoListEntity.getId());
                todoList.add(toDoListEntity);

        }
        return toDoListEntity;

    }

    public ToDoListEntity deleteById(long id) {
        ToDoListEntity toDoListEntity = findById(id);

        if (toDoListEntity == null) return null;  // checking to see if we can find the todo item

        if (todoList.remove(toDoListEntity)) {   // checking to see if we are able to remove the todo item
            return toDoListEntity;
        }
        return null;
    }

    public ToDoListEntity findById(long id) {
        for(ToDoListEntity toDoListEntity: todoList){
            if(toDoListEntity.getId() == id){
                return toDoListEntity;
            }
        }
            return null;
    }

}
