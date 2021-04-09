import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  User: any = ['Super Admin', 'Author', 'Reader'];


  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    const user : User = {
      id : null ,
      name : form.value.username ,
      email : form.value.email ,
      password: form.value.password ,
      age : form.value.age
    };
    this.userService.addUser(user);
  }

}
