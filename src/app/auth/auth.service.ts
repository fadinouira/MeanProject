import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs' ;
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserService {
  private users : User[] = [] ;
  private postsUpdated = new Subject<User[]>();
  private maxUsers : number ;
  private maxUsersUpdated = new Subject<number>();

  constructor(private http : HttpClient, private router : Router){
}

  addUser(user : User){
    this.http.post<{message : string,user : User }>('http://localhost:3200/api/users/signup',user)
    .subscribe((response)=>{
      console.log(response.message);
      user = response.user ;
      this.users.push(user);
      this.postsUpdated.next([...this.users]);
      this.router.navigate(["/"]);
    });

  }



}
