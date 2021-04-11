import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs' ;
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class UserService {
  private users : User[] = [] ;
  private postsUpdated = new Subject<User[]>();
  private maxUsers : number ;
  private maxUsersUpdated = new Subject<number>();

  constructor(private http : HttpClient, private router : Router){
}

  addUser(user : User){
    this.http.post<{message : string}>('http://localhost:3200/api/users/signup',user)
    .subscribe((response)=>{
      console.log(response.message);
      this.router.navigate(["/"]);
    });
  }

  logIn(email: string,password : string){
    const req = {
      email : email,
      password : password
    }
    this.http.post<{message : string, token : string}>('http://localhost:3200/api/users/login',req)
      .subscribe(response =>{
        console.log(response);
      });
  }



}
