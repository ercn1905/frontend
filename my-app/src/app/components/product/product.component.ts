import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service'
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  @Input() product: Product;
  productForm: FormGroup;
  
  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.getProduct();

    this.productForm = this.formBuilder.group({
      quantity: ['1']
    });

   
  }
  addToCart(){
    this.productService.addToCart(this.product,this.productForm.controls.quantity.value);
    this.router.navigate(['/cart'])
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }


}
