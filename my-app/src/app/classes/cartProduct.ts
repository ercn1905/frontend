import { Product } from './product';

export class CartProduct{
    product: Product;
    quantity: number;
    totalPrice: number;
    
    constructor(product: Product, quantity:number){
        this.product = product;
        this.quantity=quantity;
        this.totalPrice = product.newPrice * quantity;
    }

    setNewQuantity(quantity: number){
        this.quantity = quantity;
        this.totalPrice = this.product.newPrice * this.quantity;
    }

    public increaseQuantity(){
        this.quantity += 1;
        this.totalPrice = this.product.newPrice * this.quantity;
    }
    
}