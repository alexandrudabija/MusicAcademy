import { Component, ViewEncapsulation, Injectable, OnInit,} from '@angular/core';
import SwiperCore, { Navigation, Pagination,  Scrollbar, A11y,EffectFade} from 'swiper';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { Products } from 'src/app/models/product.model';
import { UserService } from 'src/app/services/user.service';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent implements OnInit {
  // for filter !
 value:any;
 value2:any;
 filterstring:string="";


  public products$ = new Observable<Products[]>
  public _cart$ = new Observable<any>
  public _cart: Cart = { items: [] };
  itemsQuantity:number = 0;
  showCart:boolean = false;



  constructor(private CartService: CartService,  private productService: ProductService,     public router: Router,
    public userService :UserService,
    ) { }


    login():any
    {
     return   this.userService.getToken()

    }



  get cart(): Cart
   {
    return this._cart;
  }


  set cart(cart: Cart)
  {
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item: any) => item.quantityProduct)
      .reduce((prev: any, current: any) => prev + current, 0);
  }


  ngOnInit()
  {


      this._cart$=  this.CartService.cart;

      this._cart$.subscribe((_cart: any) => {
          this.cart = _cart;
        })

        // for don't lose the memory
        // setTimeout(() =>   this._cart$.unsubscribe(), 10000);


// this automatically close the stream
     this.products$= this.productService.getProducts()




      }






  // add
  addOnCart(obj: CartItem): void
  {
        this.CartService.addToCart(
          {
            idProduct: obj.idProduct,
            nameProduct: obj.nameProduct,
            brandProduct: obj.brandProduct,
            priceProduct: obj.priceProduct,
            imgProduct: obj.imgProduct,
            quantityProduct: 1,
            stockProduct: obj.stockProduct
          }

        );
  }

  toggleCart():void
   {
    this.showCart = !this.showCart;
  }


  // method for total price
  getTotal(items: Array<CartItem>): number
   {
    return this.CartService.getTotal(items);
  }

  onClearCart():void
   {
    this.CartService.clearCart();
  }





filterByPriceByInput(data:Awaited<any>, startValue:any ,  endValue:any,filterstring:string):any
{


if (!data) {}


else {

  if (startValue===undefined&&endValue==undefined&&filterstring===""||startValue===0&&endValue==0&&filterstring==="")
  {
  return data;

  }
  else if (startValue===undefined)
  [
    startValue=0

  ]
  else if (endValue===undefined)
  {
    endValue=0

  }

const objArrays:any[]=[...data]
const newdata:any=[];

  for(let i=0 ; objArrays.length>i ; i++)
  {


      if(startValue<=objArrays[i]?.priceProduct && endValue>=objArrays[i]?.priceProduct  )
      {


        newdata.push(objArrays[i])

      }


  }


if (filterstring==="") {


  return  newdata
 }


else {

      const search :any =[];



      newdata.length!=0 ?  newdata.filter((obj:any , index:any )=>{


        if (obj.brandProduct.toString().toLowerCase().includes(filterstring.toLowerCase()) ||
        obj.priceProduct.toString().toLowerCase().includes(filterstring.toLowerCase())
        ||obj.nameProduct.toString().toLowerCase().includes(filterstring.toLowerCase()))
        {
        //  include face afisarea dinamica !
        search.push(obj);



        }




        }) : objArrays.filter((obj:any , index:any )=>{


      if (obj.brandProduct.toString().toLowerCase().includes(filterstring.toLowerCase()) ||
      obj.priceProduct.toString().toLowerCase().includes(filterstring.toLowerCase())
      ||obj.nameProduct.toString().toLowerCase().includes(filterstring.toLowerCase()))
      {
      //  include face afisarea dinamica !
      search.push(obj);



      }




      })


      return search


}
}





}




  // config for swiper !
  swiperConfig: any = {
    breakpoints: {
      1000: {
        spaceBetween: 20,
        slidesPerView: 3,
        Pagination: true,
        Scrollbar: true,
        Navigation: true,
      },
      600: {
        spaceBetween: 14,
        slidesPerView: 2,
        Pagination: true,
        Scrollbar: true,
        Navigation: true,
      },

      0: {
        spaceBetween: 10,
        slidesPerView: 1,
        Pagination: true,
        Scrollbar: true,
        Navigation: true,
      },
    },
  };
}
