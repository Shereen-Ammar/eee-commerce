import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);

  wishlistHtml: string = '';

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe((data: Product[]) => {

      this.wishlistHtml = data.map((item) => `
        <div class="card shadow p-3">
          <img src="${item.imageCover}" class="w-full rounded mb-4 h-[350px]" alt="${item.title}">
          <h3 class="font-semibold">${item.title}</h3>
          <p>${item.price} EGP</p>
          
        </div>
      `).join('');
    });

    this.wishlistService.loadWishlist();
  }
}
