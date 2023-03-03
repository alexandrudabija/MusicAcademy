import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
// In this code, the BehaviorSubject is used to store the cart object, so that any component that subscribes
// to it can receive updates when an item is added or removed from the cart.
  cart=new BehaviorSubject<Cart>({items: []})

  constructor(private _snackBar : MatSnackBar) { }

  addToCart (item : CartItem):void
  {

const items = [...this.cart.value.items];
const itemInCart = items.find((_item)=>_item.idProduct===item.idProduct);


        if(itemInCart)
        {
// when  assign a variable to an object, we are creating a reference to that object.
// So any changes we make to the object through the variable will be reflected in the original object as well.
          itemInCart.quantityProduct+=1;
          this.cart.next({items:items});
        }
        else
        {
           const array = [...items,item]
          this.cart.next({items:array});
        }
          // we did to check if the object is already in the bin so we don't push double array !
      // i gave the value for array !
      this._snackBar.open('1 item added to car.','ok',{duration:3000})
  }

  getTotal(items:Array<CartItem>):number
  {
    // find all the quantity, and after , we sum the total for each row
   return items.map((item)=> item.priceProduct*item.quantityProduct ).reduce((prev,current)=> prev+current,0)
  }



  clearCart():void
  {
    this.cart.next({items:[ ]})
    this._snackBar.open('cart is cleared.', 'ok', {duration:3000})
    // this.cart.complete();

  }

  removeOneItem (item:CartItem):void
  {
    const filteredItems= this.cart.value.items.filter (
      (_item)=> _item.idProduct !== item.idProduct
    )
      this.cart.next({items:filteredItems})
      this._snackBar.open('1 item remved from cart .', 'ok', {duration:3000})
  }









  removeQuantity(item:CartItem):void
  {

    let itemForRemoval :CartItem |undefined;
   let filterItems = this.cart.value.items.map((_item)=>


      {
              if(  _item.idProduct === item.idProduct)
              {
                    _item.quantityProduct--;

                          // if quantity is 0 , we need to cancel from cart !
                          if(_item.quantityProduct===0)
                          {

                              itemForRemoval = _item;

                          }
              }


              return _item;

      })




      if(itemForRemoval)
      {
        this.removeOneItem(itemForRemoval)


      }


      else {
              this.cart.next({items:filterItems})

             this._snackBar.open('1 item removed from cart ','ok ',{duration:3000})


      }



  }








}
