import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProductComponent } from '../components/user-product/user-product.component';
import { UserProduct } from '../models/user-product.model';

@Injectable({
  providedIn: 'root'
})
export class UserproductsService {

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    return this.http.get<UserProduct[]>(`${environment.backend}user-products`);
  }

  public getUserProducts(userId: string) {
    return this.http.get<UserProduct[]>(`${environment.backend}user-products/user/${userId}`)
  }
}
