import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  productCount: number;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private productService: ProductService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
    this.productCount = this.productService.getProductCount();
  }

}
