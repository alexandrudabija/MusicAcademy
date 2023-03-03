import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enableProdMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {
  title = 'FrontEndMusicSchool';



constructor (private router : Router
) {}



ngOnInit():void
{
  enableProdMode();
  this.router.navigate(['/index']);




}




}
