import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {


  UserForm!: FormGroup;



  constructor(private userService: UserService, private UserBuilder: FormBuilder,
    private SignInComponent :SignInComponent
 ) {}





  ngOnInit(): void {

         const date=new Date();
      this.UserForm = this.UserBuilder.group({

        firstname: ['', [Validators.required,Validators.minLength(2)]],
        lastname: ['',[ Validators.required,Validators.minLength(2)]],
        country: ['',[ Validators.required,Validators.minLength(3)]],
        email:["",[Validators.required,Validators.email]],
        // yearOfBirth: ['', [Validators.required,Validators.minLength(4)]],
         password:["",[Validators.required,Validators.minLength(4)]],
        dateRegistration: date,
        orders: this.UserBuilder.array
      })

  }



  get email ()
  {

  return this.UserForm.get('email')

  }

  get password()
  {
  return this.UserForm.get('password')

  }



  get firstname()
  {
  return this.UserForm.get('firstname')

  }


  get lastname()
  {
  return this.UserForm.get('lastname')

  }


  get country()
  {
  return this.UserForm.get('country')

  }

  // get yearOfBirth()
  // {
  // return this.UserForm.get('age')

  // }



  postUser(): void {

    this.userService.postUser(this.UserForm.value).subscribe({

      next: (res) => {

        alert('User added Successfully ');
        // after register we make immediately login


this.SignInComponent.login(
  {
  email:this.UserForm.value.email,
  password:this.UserForm.value.password

  }  )

  this.UserForm.reset();


      }
      ,
      error: (res) => {



        alert(res.error );

      }


    });




  }






}
