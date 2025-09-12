import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  cartCount = 0;
  isFavorite: boolean = false;

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.isFavorite = res.data.some(p => p._id === this.product._id);
      }
    });
  }

  addToCart() {
    this.cartCount++;
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleWishlist(event: Event): void {
    event.stopPropagation();

    if (this.isFavorite) {
      this.wishlistService.removeFromWishlist(this.product._id).subscribe({
        next: () => {
          this.isFavorite = false;
          this.toastrService.info('Removed from Wishlist');
          this.wishlistService.loadWishlist();
        }
      });
    } else {
      this.wishlistService.addToWishlist(this.product._id).subscribe({
        next: () => {
          this.isFavorite = true;
          this.toastrService.success('Added to Wishlist');
          this.wishlistService.loadWishlist();
        }
      });
    }
  }

}
