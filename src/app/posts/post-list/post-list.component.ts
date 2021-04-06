import { Component, OnInit,Input, Injectable, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})


export class PostListComponent implements OnInit, OnDestroy {

  panelOpenState = false;

  posts :Post[] = [] ;
  private postSub: Subscription ;
  private maxPostsSub: Subscription ;
  public isLoading : boolean;
  totalPosts : number;
  postPerPage = 5 ;
  pageSizeOption = [5,10,20,40];
  currentPage = 1 ;


  constructor(public postService : PostService) {

  }

  ngOnInit(): void {
    this.postService.getPosts(this.postPerPage,this.currentPage) ;
    this.isLoading = true;
    this.postSub = this.postService.getPostsListener()
    .subscribe((posts : Post[]) => {
      this.posts = posts ;
      this.isLoading = false;
    });
    this.maxPostsSub = this.postService.getMaxPostsListener()
    .subscribe((maxPosts : number) => {
      this.totalPosts = maxPosts ;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  onDelete(id : string){
    this.isLoading = true;
    this.postService.deletePost(id);
    this.isLoading = false;
  }

  onChangePage(pageData : PageEvent){
    console.log(pageData);
    this.isLoading = true;
    this.postPerPage = pageData.pageSize ;
    this.currentPage = pageData.pageIndex + 1;
    this.postService.getPosts(this.postPerPage,this.currentPage) ;
  }

}
