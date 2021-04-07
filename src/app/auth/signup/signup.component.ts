import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  User: any = ['Super Admin', 'Author', 'Reader'];


  constructor() { }

  ngOnInit(): void {
  }

}
