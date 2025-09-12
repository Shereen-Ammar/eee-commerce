import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  pageSize!: number;
  p!: number;
  total!: number;
  text: string = "";

  productsList: Product[] = [];

  ngOnInit(): void {
    this.getAllProductsData()
  }
  getAllProductsData(pageNumber: number = 1): void {
    this.ngxSpinnerService.show();
    this.ProductsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        console.log(res.data);

        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;

        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);

        this.ngxSpinnerService.hide();

      }
    })
  }

}
