import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/classes/cartProduct';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartProducts: CartProduct[];
  quantityControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCartProducts();

  }

  removeCartProduct(product: CartProduct) {
		this.productService.removeProductFromCart(product);

		// Recalling
		this.getCartProducts();
  }

  increaseQuantity(product: CartProduct){
    this.changeQuantity(product,product.quantity+1);
    this.getCartProducts();
  }
  decreaseQuantity(product: CartProduct){
    if(product.quantity === 1){
      this.removeCartProduct(product);
    }else{
      this.changeQuantity(product,product.quantity-1);
    }

    this.getCartProducts();
  }
  
  changeQuantity(product: CartProduct, _quantity: number) {
		this.productService.changeProductQuantity(product,_quantity);

		// Recalling
		this.getCartProducts();
	}

  getCartProducts(){
    this.cartProducts = this.productService.getLocalCartProducts();
  }
  


}
