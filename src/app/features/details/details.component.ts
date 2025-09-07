import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRouteda = inject(ActivatedRoute);
  private readonly detailsService = inject(DetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productDetails: Product = {} as Product;

  id: string | null = null;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails();
  }

  getProductId(): void {
    this.activatedRouteda.paramMap.subscribe({
      next: (urlParms) => {
        console.log(urlParms.get('id'));
        this.id = urlParms.get('id');
      }
    })
  }

  getProductDetails(): void {
    this.detailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          this.toastrService.success(res.message, 'FreshCart')
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
