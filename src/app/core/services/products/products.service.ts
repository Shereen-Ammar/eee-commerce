import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly httpClient = inject(HttpClient);

  getAllProducts(page: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${page}`);
  }



  // Get products by category
  getProductsByCategory(categoryId: string, page: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?category=${categoryId}&page=${page}`);
  }


}
