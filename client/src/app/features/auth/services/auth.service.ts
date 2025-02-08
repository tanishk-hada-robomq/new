import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment'
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;
  private username: string = '';

  constructor(private http: HttpClient) { }

  private setUsername(username: string){
    this.username = username;
  }

  getUsername(): string{
    return this.username;
  }

  private setAuthState(isAuthenticated: boolean){
    sessionStorage.setItem('auth-state', JSON.stringify(isAuthenticated))

    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getAuthState(): Observable<boolean>{
    return this.isAuthenticatedSubject.asObservable();
  }

  getLocalAuthState(): boolean{
    const storedState = sessionStorage.getItem('auth-state');
    return storedState ? JSON.parse(storedState) : false;
  }

  validateToken(): Observable<boolean>{
    return this.http.post(`${this.apiUrl}/auth/validate-token`, {}, {withCredentials: true}).pipe(
      map((response: any) => {
        if(response.success){
          this.setAuthState(true);   
          this.setUsername(response.user.username);     
          return true;
        }else{
          this.setAuthState(false);
          return false;
        }
      }),
      catchError(() => {
        this.setAuthState(false);
        return of(false);
      })
    )
  }  

  login(data: any): Observable<boolean>{
    return this.http.post(`${this.apiUrl}/auth/login`, data, {withCredentials: true}).pipe(
      map((response: any) => {
        if(response.success){
          this.setAuthState(true);
          return true;
        }else{
          this.setAuthState(false);
          return false;
        }
      }),
      catchError(() => {
        this.setAuthState(false);
        return of(false);
      })
    )
  }

  register(data: any): Observable<boolean>{
    return this.http.post(`${this.apiUrl}/auth/register`, data, {withCredentials: true}).pipe(
      map((response: any) => {
        if(response.success){
          return true;
        }else{
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  logout(): Observable<boolean>{
    return this.http.get(`${this.apiUrl}/auth/logout`, {withCredentials: true}).pipe(
      map((response: any) => {
        if(response.success){
          this.setAuthState(false);
          return true;
        }else{
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    )
  }
}
