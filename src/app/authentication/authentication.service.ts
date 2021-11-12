import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../Model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  loggedInStatus = false;

  redirectUrl : string = "";
  
  constructor(private httpClient :HttpClient) { 

  }

  login(data:Login) :Observable<any> {
    return this.httpClient.post<any>(environment.serverUrl+"/auth/login", data)
    .pipe(
      tap(_ =>{
        this.loggedInStatus = true;
        this.isLoggedIn.emit(true);
  }),
      catchError(this.handleError('login Sucess', []))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
    
  }
  
  private log(message: string) {
    console.log(message);
  }
}
