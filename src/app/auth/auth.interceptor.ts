import { HttpInterceptor,HttpRequest,HttpHandler } from "@angular/common/http";
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{


  constructor (private router :Router,private userService: UserService){}


intercept(req:HttpRequest<any>,next:HttpHandler) {

  // if in backend we don't need to verify the request , no need the token !
if(req.headers.get('noauth'))
{
return next.handle(req.clone())


}else{

const clonedresq= req.clone({

  headers:req.headers.set("Authorization","Bearer "+this.userService.getToken())
});

return next.handle(clonedresq).pipe(

  tap(

   event=>{

   },

   err=> {
 if(err.error.auth==false)
 {

  this.router.navigateByUrl('/login');
 }

   }


  )


)


}

}


// This code allows the application to automatically add an "Authorization" header to all requests,
// and handle the case where the server returns an error indicating that the user is not authenticated.


}
