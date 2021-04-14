import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/auth.service';
import { Post } from './posts/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private auth : UserService){}
  ngOnInit(): void {
    this.auth.autoAuthUser();
  }


}
