import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy{

  private authListenerSub : Subscription ;
  private userNameSub : Subscription ;
  userLogedIn = this.auth.getAuthStatus() ;
  userName = this.auth.getUserName() ;

  constructor(private auth : UserService) { }

  ngOnInit(): void {
    this.userLogedIn = this.auth.getAuthStatus() ;
    this.authListenerSub = this.auth.getAuthStatesListener().subscribe(result => {
      this.userLogedIn = result ;
    });
    this.userNameSub = this.auth.getUserNameListener().subscribe(result => {
      this.userName = result ;
    });
  }

  ngOnDestroy() : void {
    this.authListenerSub.unsubscribe();
  }

  onSignOut() : void {
    this.auth.signOut();
  }

}
