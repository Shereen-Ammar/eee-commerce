import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  private wishlistSubject = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  wishlist: any[] = [];

  getWishlist(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(this.apiUrl);
  }

  loadWishlist(): void {
    this.getWishlist().subscribe({
      next: (res) => {
        console.log('LOAD WISHLIST:', res);
        this.wishlistSubject.next(res.data);
      },
      error: (err) => console.log('LOAD ERR:', err)
    });
  }


  addToWishlist(productId: string): Observable<any> {
    return this.http.post(this.apiUrl, { productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
