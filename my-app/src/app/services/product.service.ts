import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Product } from '../classes/product';
import { PRODUCTS } from '../mock-product';
import { Observable, of } from 'rxjs';
import { CartProduct } from '../classes/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient
    ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  searchProduct(term: string): Observable<Product[]>{
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl,product);
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id =typeof product ==='number'? product:product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url);
  }

  updateProduct(product: Product): Observable<any>{
     return this.http.put(this.productsUrl, product);
  }

  /*   Cart Functions        */
  addToCart(product: Product, quantity: number){
    let cartProduct = new CartProduct(product,quantity);
    let cartList: CartProduct[];
    cartList = JSON.parse(localStorage.getItem('cart_items')) || [];

    let tmpProduct = cartList.find(x => x.product.id === cartProduct.product.id);

    if(tmpProduct){
      cartList[cartList.findIndex(x => x.product.id === cartProduct.product.id)].quantity  += quantity;
    }
    else{
      cartList.push(cartProduct);
    }
    localStorage.setItem('cart_items',JSON.stringify(cartList));
  }

  removeProductFromCart(product: CartProduct){
    const cartList: CartProduct[] = JSON.parse(localStorage.getItem('cart_items'));

    for (let i = 0; i < cartList.length; i++) {
			if (cartList[i].product.id === product.product.id) {
				cartList.splice(i, 1);
				break;
			}
    }
    localStorage.setItem('cart_items',JSON.stringify(cartList));
  }

  // not working
  changeProductQuantity(cartProduct: CartProduct, newQuantity: number){
    const cartList: CartProduct[] = JSON.parse(localStorage.getItem('cart_items'));
    
    cartList[cartList.findIndex(x => x.product.id === cartProduct.product.id)].quantity  = newQuantity;

    localStorage.setItem('cart_items',JSON.stringify(cartList));
  }

  getLocalCartProducts(): CartProduct[] {
		const products: CartProduct[] = JSON.parse(localStorage.getItem('cart_items')) || [];

		return products;
  }
  
  calculateProductTotalPrice(cartProduct: CartProduct): number{
    return cartProduct.quantity * cartProduct.product.newPrice;
  }
  getProductCount(): number{
    const products: CartProduct[] = JSON.parse(localStorage.getItem('cart_items')) || [];
    return products.length;
  }

  getTotalPaymentPrice(): number{
    const cartList: CartProduct[] = JSON.parse(localStorage.getItem('cart_items'));
    let totalPaymentPrice: number;

    totalPaymentPrice = cartList.reduce(function(prev,cur){
      prev += cur.product.newPrice * cur.quantity;
      return prev;
    },0);

    return totalPaymentPrice;
  }

  getTotalNonDiscountPrice(): number{
    const cartList: CartProduct[] = JSON.parse(localStorage.getItem('cart_items'));
    let totalPaymentPrice: number;

    totalPaymentPrice = cartList.reduce(function(prev,cur){
      prev += cur.product.price * cur.quantity;
      return prev;
    },0);

    return totalPaymentPrice;
  }

  getDiscountAmount(): number{
    return this.getTotalNonDiscountPrice() - this.getTotalPaymentPrice();
  }

}
