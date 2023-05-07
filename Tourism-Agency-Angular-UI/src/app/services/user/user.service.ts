import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  saveUser(user:User){
    return this.http.post<User>("save url",user)
  }

  getAllUser(){
    return this.http.get<User[]>("get all url")
  }

  deleteUser(id:string){
    return this.http.get<boolean>("delete url"+id)
  }

  findByUser(id:string){
    return this.http.get<User>("find url"+id)
  }

  login(login:Login){
    return this.http.post<User>("giriş url",login)
  }
}
