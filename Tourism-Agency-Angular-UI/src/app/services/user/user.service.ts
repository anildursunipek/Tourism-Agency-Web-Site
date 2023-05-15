import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private http:HttpClient) { }

  saveUser(user:User){
    return this.http.post<User>(this.baseApiUrl + "/api/Users", user)
  }

  getAllUser(){
    return this.http.get<User[]>(this.baseApiUrl + "/api/Users")
  }

  deleteUser(id:string){
    return this.http.delete<boolean>(this.baseApiUrl + "/api/Users/delete/"+id)
  }

  findByUser(id:string){
    return this.http.get<User>(this.baseApiUrl + "/api/Users/"+id)
  }

  login(login:Login){
    return this.http.post<User>("giriş url",login)
  }

  priority(){
    return this.http.get<User[]>(this.baseApiUrl + "/api/Users/priority")

  }
}
