import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  saveComment(comment: Comment) {
    return this.http.post<Comment>(environment.SERVER_API_URL + "/comment/save", comment)
  }
  
  findByTourItemId(id: string) {
    return this.http.get<Comment[]>(environment.SERVER_API_URL + "/comment/find/by/tour/item/id/"+ id)
  }
}
