import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);

  //  Get All Categories
  getAllCategories(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'categories');
  }

  //  Get SubCategories by CategoryId
  getSubCategoriesByCategoryId(categoryId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${categoryId}/subcategories`);
  }

  //  Get Products by CategoryId
  getProductsByCategoryId(categoryId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?category[in]=${categoryId}`);
  }

  //  Get Products by SubCategoryId
  getProductsBySubCategoryId(subCategoryId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?subcategory[in]=${subCategoryId}`);
  }
}
