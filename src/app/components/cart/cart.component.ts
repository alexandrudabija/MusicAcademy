import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { ShopComponent } from 'src/app/pages/shop/shop.component';
import { CartItem ,Cart} from 'src/app/models/cart.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})

export class CartComponent implements OnInit ,OnDestroy {
  @Output() onClose = new EventEmitter<any>();

 public dataSource: Array<CartItem> = [];
 subscription! :Subscription;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // for the beautiful display in the basket ,it will be displayed in rows and columns !
  // we need to set correct the rows and colums in cart.component
  displayedColumns: Array<string> = [
    'nameProduct',
    'brandProduct',
    'priceProduct',
    'imgProduct',
    'quantityProduct',
    'total',
    'action',
  ];


  constructor(public shop: ShopComponent, private CartService: CartService,
public Router :Router ,private _snackBar : MatSnackBar,private UserService :UserService)
  {}



// we receive from shopComponents throught  cart.services the items whitch has been add in cart
  ngOnInit()
  {
 this.subscription=this.CartService.cart .subscribe((_cart: Cart) => {
   this.dataSource=_cart.items;

  });






  }


toggle() { this.onClose.emit(); }

// we call total for all elemts in cart
getTotal(items: Array<CartItem>): number {    return this.CartService.getTotal(items);  }

onClearCart () {   this.CartService.clearCart() }

removeOneItem(item:CartItem):void{ this.CartService.removeOneItem(item)}

removeQuantity(item:CartItem):void { this.CartService.removeQuantity(item) }

onAddQuantity(item:CartItem):void { this.CartService.addToCart(item)   }





onCheckout():void
{
    if(this.UserService.getToken()){this.Router.navigate(['/checkout']) }

    else{ this._snackBar.open('Please  sign  In  or  Register  on  site ','ok',{
      duration:6000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,}
    )


    }

}






ngOnDestroy(): void {
  this.subscription.unsubscribe()
   }
}

