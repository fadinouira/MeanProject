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
  userLogedIn = this.auth.getAuthStatus() ;

  constructor(private auth : UserService) { }

  ngOnInit(): void {
    this.authListenerSub = this.auth.getAuthStatesListener().subscribe(result => {
      this.userLogedIn = result ;
    });
  }

  ngOnDestroy() : void {
    this.authListenerSub.unsubscribe();
  }

  onSignOut() : void {
    this.auth.signOut();
  }

}
