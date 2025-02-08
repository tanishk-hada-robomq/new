import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from "../../features/todos/components/todo-item/todo-item.component";
import { CommonModule } from '@angular/common';
import { TodoModalComponent } from "../../features/todos/components/todo-modal/todo-modal.component";
import { TodoService } from '../../features/todos/services/todo.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, TodoModalComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  todos: Todo[] = [];  
  username: string = '';

  showModal: boolean = false;
  currTodo: Todo | null = null;

  constructor(private authService: AuthService, private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTodos();
    this.username = this.authService.getUsername();
  }

  loadTodos(){
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openModal(todo: Todo | null = null){
    if(todo){
      this.currTodo = todo;
    }else{
      this.currTodo = null;
    }
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
    this.currTodo = null;
  }

  onCreate(todo: Todo){
    this.todoService.createTodo(todo).subscribe({
      next: (success) => {
        if(success){
          this.closeModal();
          this.loadTodos();
        }else{
          console.log('error creating todo')
        }
      }
    })
  }  

  onSave(todo: Todo){
    this.todoService.updateTodo(todo).subscribe({
      next: (success) => {
        if(success){
          this.closeModal();
          this.loadTodos();
        }else{
          console.log('error in updating todo')
        }
      }
    })
  }

  onDelete(todo: Todo){
    this.todoService.deleteTodo(todo).subscribe({
      next: (success) => {
        if(success){
          this.closeModal();
          this.loadTodos();
        }else{
          console.log('error deleting todo')
        }
      }
    })
  }

  onEdit(todo: Todo){
    this.openModal(todo);
  }  

  onLogout(){
    this.authService.logout().subscribe({
      next: (success) => {
        if(success){
          this.router.navigate(['/login']);
        }        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
