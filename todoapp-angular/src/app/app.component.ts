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

  ngOnInit(): void {
    //At component initialization the
    this.todoService.getToDo().subscribe(todos => {
      this.todosList = todos;
      console.log(todos);
    })
  }
}
