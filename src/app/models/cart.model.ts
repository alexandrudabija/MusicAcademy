
export interface Cart
{
items:Array<CartItem>;

}

export interface  CartItem
{

  idProduct: number,
  nameProduct: String,
  brandProduct: String,
  priceProduct: number,
  imgProduct: String,
  quantityProduct: number,
  stockProduct:number
}