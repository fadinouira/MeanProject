import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs' ;
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PostService {
  private posts : Post[] = [] ;
  private postsUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient){
}

  getPosts() {
    this.http.get<{message : String , posts : any}>('http://localhost:3200/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title : post.title,
          content : post.content,
          id : post._id
        }
      });
    }))
    .subscribe((posts)=>{
      this.posts = posts ;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post : Post){
    this.http.post<{message : String }>('http://localhost:3200/api/posts', post)
    .subscribe((response)=>{
      console.log(response.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }



}
