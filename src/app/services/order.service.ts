import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ReceiveOrders ,SendOrder} from '../models/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http :HttpClient ) { }
  // readonly  url= 'http://localhost:3000/api/order';
  readonly  url= 'https://backend-music-academy.vercel.app/api/order';


  getOrdersUser()
{
  const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));

return this.http.get<ReceiveOrders>(this.url+"/ordersUser",{ headers: reqHeader})

.pipe(
  //  Normalizing Data , whe change order of object to start for last order !
        map((orders:ReceiveOrders)=>{ return this.filters(orders)
        })


        );

}


postOrder(order :SendOrder):Observable<SendOrder>
{
  return this.http.post<SendOrder>(this.url+"/postOrder",order);
}


    filters(value :any):any
    {


      let k= true;
      const arrayObj=[...value];


        while(k==true)
        {

          k=false;

                for(let i=0 ,temp;i<arrayObj.length; i++ )
            {


              if(arrayObj[i]?.idOrder<arrayObj[i+1]?.idOrder)
              {
                  temp =arrayObj[i] ;
                  arrayObj[i]=arrayObj[i+1];
                  arrayObj[i+1]=temp;

                k=true;
              }


            }
        }
        if(k===false) {

        return arrayObj
        }


    }
}
