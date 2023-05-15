import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private http: HttpClient) { }

  saveComment(comment: Comment) {
    console.log(comment)
    return this.http.post<Comment>(this.baseApiUrl + "/api/Comments", comment)
  }

  findByTourItemId(id: string) {
    return this.http.get<Comment[]>(this.baseApiUrl + "/api/Comments/"+ id)
  }
}
