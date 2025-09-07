import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService)

  productsList: Product[] = [];

  ngOnInit(): void {
    this.getAllProductsData()
  }
  getAllProductsData(): void {
    this.ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productsList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
