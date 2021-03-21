import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
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


  constructor(public postService : PostService) { }

  ngOnInit(): void {
  }

  onAdd( form : NgForm) {
    if(form.invalid){
      return ;
    }
    const post : Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    }

    this.postService.addPost(post);
    form.resetForm();
  }

}
