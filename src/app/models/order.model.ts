export interface SendOrder
{

  address: {
  city: string;
  country: string;
  houseNumber: string;
  phone: Number;
  street: string;
  zipcode: string;
  }
  items: Array<{
  idProduct: number;
  nameProduct: string;
  brandProduct: string;
  priceProduct: number;
  imgProduct: string;
  }>;
  payment: {
  currency: string;
  dateOrder: Date;
  paymentMethod: {
  bank_transfer: string;
  card_Visa_Mastercard: string;
  paypal: string;
  payment: string;
  },
  total: number;
  },
  user: {
  email: string;
  firstname: string;
  lastname: string;
  }



}


export interface ReceiveOrder {
  idOrder: number;
  address: {
  city: string;
  country: string;
  houseNumber: string;
  phone: Number;
  street: string;
  zipcode: string;
  }
  items: Array<{
  idProduct: number;
  nameProduct: string;
  brandProduct: string;
  priceProduct: number;
  imgProduct: string;
  }>;
  payment: {
  currency: string;
  dateOrder: Date;
  paymentMethod: {
  bank_transfer: string;
  card_Visa_Mastercard: string;
  paypal: string;
  payment: string;
  },
  total: number;
  },
  user: {
  email: string;
  firstname: string;
  idUser: number;
  lastname: string;
  },
  __v: number;
  _id: string;
  }



export interface ReceiveOrders
{
    orders:Array<ReceiveOrder>;

}


export interface Orders
{
    orders:Array<SendOrder>;

}
