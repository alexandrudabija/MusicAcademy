import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) { }
  // readonly  url= 'http://localhost:3000/api';
  readonly  url= 'https://backend-music-academy.vercel.app/api';

noAutHeader={headers:new HttpHeaders({'noAuth':'True'})}
getProducts():Observable<any>
{
return this.http.get<any>(this.url+'/product',this.noAutHeader)
}



}
