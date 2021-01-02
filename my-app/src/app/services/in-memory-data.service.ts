import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../classes/product';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  
  createDb(){
     const products: Product[] = [
      {id:1 , name:"Bilgisayar", price: 1000, newPrice:800},
      {id:2 , name:"Headphone", price: 2000, newPrice:1200},
      {id:3 , name:"Ipad", price: 300, newPrice:50},
      {id:4 , name:"Bilgisayar", price: 200, newPrice:180},
      {id:5 , name:"Bilgisayar", price: 1000, newPrice:1000},
      {id:6 , name:"Bilgisayar", price: 1200, newPrice:1100},
      {id:7 , name:"Bilgisayar", price: 1000, newPrice:800}
  ];

  const users: User[] = [
    { id: 1,
      username: "gorkemkir",
      email: "gorkemkir@xyz.com",
      password: "1234",
      address: "Turkey",
      fullname: "Gorkem Kir",
      phone: "1234567890", 
      role: "admin",
      token: "1234"
    },
    { id: 2,
      username: "cagrid",
      email: "cagrid@xyz.com",
      password: "1234567",
      address: "Turkey",
      fullname: "CAgri Iyican",
      phone: "1234567890", 
      role: "user",
      token: "1234455"
    }

  ];

  return {products, users};
  }

  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }

  constructor() { }
}
