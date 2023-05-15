import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, User } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private router: Router, private http: HttpClient) { }

  login(login:Login): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + '/api/Users/login/' + login.username + "/" + login.password);
  }


  setUserLoggedIn(user:User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(){
    if(localStorage.getItem('user')){
      const user: User = JSON.parse(localStorage.getItem('user'));
      return user;
    }
    else{
      return null;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  getLoggedIn():boolean{
    if(this.getCurrentUser()){
      return true;
    }
    else{
      return false;
    }
  }
}
