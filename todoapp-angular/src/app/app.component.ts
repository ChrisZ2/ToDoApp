import {Component, OnInit} from '@angular/core';
import {TodoService} from "./service/todo.service";
import ToDo from "./models/todo.model";
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private todoService: TodoService) {

  }

  //Declaring the new todos
  public newTodo: ToDo = new ToDo();

  //An Empty list for the visible todo list
  todosList: ToDo[];
  editTodos: ToDo[] = [];

  ngOnInit(): void {
    //At component initialization the
    this.todoService.getToDo().subscribe(todos => {
      this.todosList = todos;
      console.log(todos);
    })
  }

  //this method will get on Create button event
  create() {
    this.todoService.createToDo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res);
        this.newTodo = new ToDo();
      })
  }

  //editTodo
  editTodo(todo: ToDo) {
    console.log(todo);
    if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Successful');
        }, err => {
          this.editTodo(todo);
          console.error('Update Unsuccessful');
          console.log(err.message);
        })
      }
    }
  }

  doneTodo(todo:ToDo){
    todo.status = 'Done';
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Successful');
    }, err => {
      this.editTodo(todo);
      console.error('Update Unsuccessful');
    })
  }

  submitTodo(event, todo:ToDo){
    if(event.keyCode == 13){
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }
}
