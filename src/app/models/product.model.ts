export interface Product 
{
  _id :String,
  idProduct: number,
      nameProduct: String,
      brandProduct: String,
      priceProduct: number,
      imgProduct: String,
      quantityProduct: number,
      stockProduct:number,
      


}


export interface Products
{
  products:Array<Product>;

}