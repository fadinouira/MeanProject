import { Component, OnInit, EventEmitter,Output} from '@angular/core';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  enteredTitle = '';
  enteredText = '';
  @Output() postCreated = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAdd( ) {
    const post = {
      title: this.enteredTitle,
      content: this.enteredText
    }

    this.postCreated.emit(post);
  }

}
