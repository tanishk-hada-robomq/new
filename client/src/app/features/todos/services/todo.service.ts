import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Todo } from '../../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<{success: boolean, result: Todo[]}>(`${this.apiUrl}/todo`, {withCredentials: true}).pipe(
      map(response => {
        if(response.success){
          return response.result;
        }else{
          return [];
        }
      }),
      catchError(() => {
        return of([]);
      })
    )
  }

  createTodo(data: any): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/todo/add`, data, { withCredentials: true }).pipe(
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  updateTodo(data: any): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/todo/${data.id}`, data, { withCredentials: true }).pipe(
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  deleteTodo(data: any): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/todo/${data.id}`, { withCredentials: true }).pipe(
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    )
  }
}
