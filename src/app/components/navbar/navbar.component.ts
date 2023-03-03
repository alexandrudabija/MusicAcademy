import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  constructor (public userService :UserService,private Router : Router) {}


  login():any
  {
   return   this.userService.getToken()

  }


  logout()
  {
  this.userService.logout();
    this.Router.navigate(['/signIn'])
  }

}
