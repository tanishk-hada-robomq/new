import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  onClickEdit(){
    this.edit.emit(this.todo);
  }

  onClickDelete(){
    this.delete.emit(this.todo);
  }
}
