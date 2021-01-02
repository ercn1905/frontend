import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/classes/product';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	products: Product[];
	filterForm: FormGroup;
	categories =[
		{id:1 ,category:"Notebook"},
		{id:2 ,category:"Ultrabook"},
		{id:3 ,category:"Gaming Pc"},
		{id:4 ,category:"Work Station"},
		{id:5 ,category:"Desktop"},];
	brands = [
		{id:1 ,brand:"Asus"},
		{id:2 ,brand:"Hp"},
		{id:3 ,brand:"Dell"},
		{id:4 ,brand:"Apple"},
		{id:5 ,brand:"Razer"},
	]

	constructor(
		private productService: ProductService,
		private formBuilder: FormBuilder,
		) { }

	ngOnInit() {
		this.getProducts();
		this.filterForm = this.formBuilder.group({
			categories: new FormArray([]),
			brands: new FormArray([])
		});

		this.addCategoryChechBoxes();
		this.addBrandChechBoxes();
	}

	addCategoryChechBoxes(){
		this.categories.map((o, i) => {
			const control = new FormControl(i === 0); 
			(this.filterForm.controls.categories as FormArray).push(control);
		  });
	}
	addBrandChechBoxes(){
		this.brands.map((o, i) => {
			const control = new FormControl(i === 0); 
			(this.filterForm.controls.brands as FormArray).push(control);
		  });
	}
	getProducts(): void {
		this.productService.getProducts().subscribe(products => this.products = products);
	}


}
