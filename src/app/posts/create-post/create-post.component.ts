import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model' ;
import { PostService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  enteredTitle = '';
  enteredText = '';
  public mode ='';
  private id : string ;
  public post : Post ;
  public isLoading : boolean;


  constructor(public postService : PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      if(paramMap.has('id')) {
        this.mode = 'EDIT';
        this.id = paramMap.get('id');
        this.post = this.postService.getPost(this.id);
        this.isLoading = false;
      }
      else {
        this.mode = 'CREATE';
        this.id = null ;
        this.post = {
          id : "",
          title:"",
          content:""
        }
        this.isLoading = false;
      }
    });
  }

  onAdd( form : NgForm) {
    if(form.invalid){
      return ;
    }
    this.isLoading = true;
    if(this.mode == 'CREATE') {
      const post : Post = {
        id: null,
        title: form.value.title,
        content: form.value.content
      }
      this.postService.addPost(post);
      form.resetForm();
    }

    else if(this.mode == 'EDIT') {
      const post : Post = {
        id: this.id,
        title: form.value.title,
        content: form.value.content
      }
      this.postService.updatePost(post);
    }

  }

}
