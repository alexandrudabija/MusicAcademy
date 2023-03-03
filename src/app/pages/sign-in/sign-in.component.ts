import { login } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})



export class SignInComponent implements OnInit {

constructor (private userService :UserService,
  private UserBuilder :FormBuilder,private router : Router) {}
  UserForm!:FormGroup;

ngOnInit(): void {

this.UserForm = this.UserBuilder.group({
  email:["",[Validators.required,Validators.email]],
  password:["",[Validators.required,Validators.minLength(1)]]


})

  }





login(obj :login)
{

  this.userService.login(obj).subscribe(
      {
        next: (res) => {

          this.userService.setToken(res['token'])

          alert('User Sing in  Successfully ');
          this.router.navigate(['./user']);
          // this.UserForm.reset();
        },
        error: (res) =>
        {

          alert(res.error)
        }


  }
  );



}

get email ()
{

return this.UserForm.get('email')

}

get password()
{
return this.UserForm.get('password')

}

}
