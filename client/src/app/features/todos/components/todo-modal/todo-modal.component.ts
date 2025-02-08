import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Todo } from '../../../../models/todo.model';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css'
})
export class TodoModalComponent implements OnChanges {
  @Input() currTodo: Todo | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Todo>();
  @Output() save = new EventEmitter<Todo>();

  @ViewChild('todoForm') todoForm!: NgForm;
  data: Todo = { title: '', description: '' };
  mode: 'createMode' | 'editMode' = 'createMode';

  onCancel() {
    this.close.emit();
  }

  onCreate() {
    this.todoForm.form.markAllAsTouched();

    if (this.todoForm.valid) {
      this.create.emit(this.data);
    }
  }

  onSave() {
     this.todoForm.form.markAllAsTouched();

    if (this.todoForm.valid) {
      this.save.emit(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {   
    if(changes['currTodo']){
      if(this.currTodo === null){
        this.mode = 'createMode';
      }else{
        this.mode = 'editMode';
        this.data = {...this.currTodo};
      }
    }
  }
}
