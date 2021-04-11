import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs' ;
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { UserService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts : Post[] = [] ;
  private postsUpdated = new Subject<Post[]>();
  private maxPosts : number ;
  private maxPostsUpdated = new Subject<number>();
  private token ;
  constructor(private http : HttpClient, private router : Router){}

  getPosts(pageSize : number , currentPage : number) {
    const queryParams = "?pageSize="+pageSize+"&currentPage="+currentPage;
    this.http.get<{message : String , posts : any ,maxPages : number}>('http://localhost:3200/api/posts'+ queryParams)
    .pipe(map((postData) => {
      return {
        maxPages : postData.maxPages ,
        posts : postData.posts.map(post => {
        return {
          title : post.title,
          content : post.content,
          id : post._id,
          imagePath : post.imagePath
        }
      })};
    }))
    .subscribe((posts)=>{
      this.posts = posts.posts ;
      this.postsUpdated.next([...this.posts]);
      this.maxPosts = posts.maxPages ;
      this.maxPostsUpdated.next(this.maxPosts);
    });

  }

  getPostsListener(){
    return this.postsUpdated.asObservable();
  }

  getMaxPostsListener(){
    return this.maxPostsUpdated.asObservable();
  }

  deletePost(id :string) {
    this.http.delete<{message : string}>('http://localhost:3200/api/posts/'+id)
    .subscribe((res)=>{
      console.log(res.message);
      this.posts = this.posts.filter(post => post.id !== id);
      this.postsUpdated.next([...this.posts]);
    });
    console.log()
  }

  getPost(id: string) {
    const post = {...this.posts.find(p => p.id == id)};
    console.log("this is the post");
    console.log(post);
    return post ;
  }

  updatePost(post : Post,image : File | string){
    let postData : Post | FormData ;
    if(typeof(image) == 'object') {
      console.log("post data is image");
      postData = new FormData();
      postData.append("title" , post.title);
      postData.append("content" , post.content);
      postData.append("image" , image , post.title);
      console.log("this is the post data");
      console.log(postData);
    }
    else {
      console.log("post data is a string");
      postData  = {
        id : post.id,
        title : post.title,
        content : post.content,
        imagePath : image
      }
    }
    console.log("this is the post data");
    console.log(postData);
    var id : string  ;
    id = post.id ;
    this.http.put<{message : string}>('http://localhost:3200/api/posts/'+ id,postData)
    .subscribe((res) => {
      console.log(res.message);
      this.getPosts(5,1);
      this.router.navigate(["/"]);
    })
  }

  addPost(post : Post , image : File){
    const postData = new FormData();
    postData.append("title" , post.title);
    postData.append("content" , post.content);
    postData.append("image" , image , post.title);
    this.http.post<{message : string,post : Post }>('http://localhost:3200/api/posts', postData)
    .subscribe((response)=>{
      console.log(response.message);
      console.log(response.post.imagePath);
      this.getPosts(5,1);
      post = response.post ;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });

  }



}
