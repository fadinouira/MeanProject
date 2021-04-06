import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm ,Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model' ;
import { PostService } from '../posts.service';
import { imageValidator } from './imageValidator.validator';

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
  public clicked : boolean;
  form : FormGroup ;
  selectImage = true ;
  imgUrl : String ;


  constructor(public postService : PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clicked = false ;
    this.form = new FormGroup({
      title : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(3)]
        }),
      content : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      image : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)
          ],

          asyncValidators :
          [
            imageValidator
          ]
        },),
    });
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      if(paramMap.has('id')) {
        this.mode = 'EDIT';
        this.id = paramMap.get('id');
        this.post = this.postService.getPost(this.id);
        this.isLoading = false;
        this.form.setValue({
          title : this.post.title,
          content : this.post.content,
          image : this.post.imagePath
        })
      }
      else {
        this.mode = 'CREATE';
        this.id = null ;
        this.post = {
          id : "",
          title:"",
          content:"",
          imagePath:""
        }
        this.isLoading = false;
        this.form.setValue({'title':this.post.content,'content' : this.post.content,'image':null});
      }
    });
  }

  onAdd() {
    this.clicked = true ;
    if(this.form.invalid){
      return ;
    }
    this.isLoading = true;
    if(this.mode == 'CREATE') {
      const post : Post = {
        id: null,
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath : null
      }
      this.postService.addPost(post,this.form.value.image);

    }

    else if(this.mode == 'EDIT') {
      const post : Post = {
        id: this.id,
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath : null
      }
      console.log(this.form.value.image);
      this.postService.updatePost(post,this.form.value.image);
    }
    this.form.reset();

  }

  onImagePicked(event : Event) {
    const file  =  (event.target as HTMLInputElement).files[0] ;
    this.form.patchValue({
      image : file
    });
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result.toString() ;
      this.selectImage = true ;
    };
  }

}
