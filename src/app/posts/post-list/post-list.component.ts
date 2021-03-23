import { Component, OnInit,Input, Injectable, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})


export class PostListComponent implements OnInit, OnDestroy {

  panelOpenState = false;

  posts :Post[] = [] ;
  private postSub: Subscription ;
  public isLoading : boolean;


  constructor(public postService : PostService) {

  }

  ngOnInit(): void {
    this.postService.getPosts() ;
    this.isLoading = true;
    this.postSub = this.postService.getPostsListener()
    .subscribe((posts : Post[]) => {
      this.posts = posts ;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  onDelete(id : string){
    this.postService.deletePost(id);
  }

}
