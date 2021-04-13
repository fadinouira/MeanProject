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
  private token : string ;
  private authStatusListener = new Subject<boolean>();
  private authStatus = false ;
  private tokenTimer : any ;
  constructor(private http : HttpClient, private router : Router){}

  getToken(){
    return this.token ;
  }

  getAuthStatesListener(){
    return this.authStatusListener ;
  }

  getAuthStatus(){
    return this.authStatus;
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
    this.http.post<{message : string, token : string, expiresIn : number}>('http://localhost:3200/api/users/login',req)
      .subscribe(response =>{
        this.token = response.token ;
        if(this.token){
          const expiresIn = response.expiresIn ;
          this.tokenTimer = setTimeout(()=> {
            this.signOut();
          },expiresIn * 1000);
          this.authStatusListener.next(true);
          this.authStatus = true ;
          this.router.navigate(['/']);
        }

      });
  }

  signOut() {
    this.token = null ;
    this.authStatus = false ;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }



}
