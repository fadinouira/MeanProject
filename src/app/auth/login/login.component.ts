import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public auth : UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    this.auth.logIn(form.value.email,form.value.password);
  }

}
