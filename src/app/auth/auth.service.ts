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
    this.http.post<{message : string,user : any, token : string, expiresIn : number}>('http://localhost:3200/api/users/login',req)
      .subscribe(response =>{
        this.token = response.token ;
        if(this.token){
          const expiresIn = response.expiresIn ;
          this.setAuthTimer(expiresIn);
          this.authStatusListener.next(true);
          this.authStatus = true ;
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveOfData(this.token,expDate);
          this.router.navigate(['/']);
        }

      });
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return ;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime() ;
    if(expiresIn > 0){
      this.token = authInfo.token ;
      this.authStatus = true ;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  signOut() {
    this.token = null ;
    this.authStatus = false ;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(dur : number){
    console.log("settint time to :"+ dur);
    setTimeout(()=> {
      this.signOut();
    },dur * 1000);
  }

  private saveOfData(token : string ,expirationDate : Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if(!token || !expirationDate) {
      return ;
    }
    return {
      token : token ,
      expirationDate : new Date(expirationDate)
    }
  }



}
