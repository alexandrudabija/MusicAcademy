import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import {   combineLatest, Observable } from 'rxjs';
import { ReceiveUser } from 'src/app/models/user.model';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

 @Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

changePassword:boolean=false;
changeEmail:boolean=false;
Changesform!:FormGroup;

public  user$ = new Observable<ReceiveUser>
public orders$ = new Observable<any>

// public     combined$ = new Observable<any>

constructor (private UserService :UserService,
  private OrderService :OrderService,private formBuilder:FormBuilder) { }





   ngOnInit(): void
  {
    this.user$= this.UserService.getUser()


    this.orders$=this.OrderService.getOrdersUser();

    // this.combined$ = combineLatest([
    //   this.UserService.getUser(),
    //   this.OrderService.getOrdersUser()
    // ]);

    // this.combined$.subscribe(([user, orders]) => {
    //   // Do something with the combined results
    //   const userAndOrders = {
    //     user,
    //     orders
    //   };
    //   console.log(userAndOrders);
    // });

    this.Changesform = this.formBuilder.group({

      password:["",[Validators.required,Validators.minLength(4)]],
      oldPassword:["",[Validators.required,Validators.minLength(4)]],
      email:["",[Validators.required,Validators.email]]


          })


  }


  get email ()
  {

  return this.Changesform.get('email')

  }

  get password()
  {
  return this.Changesform.get('password')

  }
  get oldPassword()
  {
  return this.Changesform.get('oldPassword')

  }



countQty(Array:any):number
{
return Array.map((items:any)=>items.quantityProduct).reduce((prev:any,current:any)=>prev+current,0)

}



togglePassword()
{
  this.changePassword=!this.changePassword;
  this.changeEmail=false;


}

toggleEmail()
{
  this.changeEmail=!this.changeEmail
  this.changePassword=false;



}


changePassword_email()
{

      if(this.changePassword===true)
      {


            this.UserService.patchPassword({
            newPassword:this.Changesform.value.password,
            oldPassword: this.Changesform.value.oldPassword
            }).subscribe({

            next:(res:any) => {


              alert("Password Changed !")

              this.changePassword=false
              this.Changesform.reset()
            },
            error :(res:any) =>{

              alert(res.error)

            }

      })

      }
      else{



        this.UserService.pathEmail({ email: this.Changesform.value.email }).subscribe({

          next:(res:any) => {
            alert("Email Changed !")
            this.changeEmail=false
            this.ngOnInit()
          },
          error :(res:any) =>{


            alert(res.error)

          }

    })

      }

}



}
