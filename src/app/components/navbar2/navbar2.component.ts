import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.less']
})
export class Navbar2Component {

constructor (private rotute :Router)
{

}

academy()
{

this.rotute.navigate(['./academy'])

}


courses()
{

this.rotute.navigate(['./courses'])

}

studio()
{

this.rotute.navigate(['./studio'])

}


}
