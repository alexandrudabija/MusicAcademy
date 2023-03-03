import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  OrderForm!: FormGroup;
  orderId!: number;
  payment: boolean = false
  cartCheckout: Cart = { items: [] };
  subscription!: Subscription;




  constructor(public CartService: CartService, private Router: Router,
    private OrderBuilder: FormBuilder, private OrderService: OrderService,) { }




  ngOnInit(): void {





    this.subscription = this.CartService.cart.subscribe((_cart: Cart) => {
      this.cartCheckout = _cart;
   this.form();
    });






    // user cannot have access if the cart is empty !
    if (this.cartCheckout.items.length === 0 ) {

      this.Router.navigate(['/shop']);

    }


  }


  form() {

    const date = new Date();

    this.OrderForm = this.OrderBuilder.group({
      items: this.OrderBuilder.array(this.cartCheckout.items),
      user: this.OrderBuilder.group({
        idUser: [],
        firstname: [],
        lastname: [],
        email: []
      }),
      address: this.OrderBuilder.group({
        phone: [],
        country: [],
        street: [],
        houseNumber: [],
        zipcode: [],
        city: []
      }),
      payment: this.OrderBuilder.group({
        total: this.CartService.getTotal(this.cartCheckout.items),
        currency: '$',
        dateOrder: date ,
        paymentMethod: this.OrderBuilder.group({
          payment: "card_Visa_Mastercard",
          bank_transfer: this.OrderBuilder.group({
            iban: "null"
          }),
          card_Visa_Mastercard: this.OrderBuilder.group({
            numberCard: [],
            ll_aa: [],
            cvc: []
          }),
          paypal: this.OrderBuilder.group({
            paypalEmail: "null"
          })
        })
      })
      })


  }

  back(): void { this.Router.navigate(['/shop']); }



  createOrder(): void {


    // first , we create the new order

    this.OrderService.postOrder(this.OrderForm.value).subscribe(
      {
        next: (res:any) => {

          this.payment = true;
          this.orderId=res.idOrder
          alert('Order added successfully')

         this.CartService.clearCart();
        },
        error: (res) => {



          alert(res) }

      })

  }










  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}



