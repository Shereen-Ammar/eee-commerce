import { Component, OnInit, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  categories: any[] = [];
  subcategories: any[] = [];
  products: any[] = [];


  selectedCategoryId: string | null = null;
  selectedSubCategoryId: string | null = null;

  ngOnInit(): void {
    this.loadAllCategories();
  }

  //  Load Categories
  loadAllCategories(): void {
    this.ngxSpinnerService.show();
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });
  }

  //  When Category Clicked
  onCategoryClick(categoryId: string): void {
    console.log(' Clicked categoryId:', categoryId);

    this.selectedCategoryId = categoryId;
    this.selectedSubCategoryId = null;
    this.products = [];

    this.ngxSpinnerService.show();

    // Get products of the category
    this.categoriesService.getProductsByCategoryId(categoryId).subscribe({
      next: (res) => {
        console.log(' Products Response:', res);

        this.products = res.data;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });

    // Get subcategories of this category
    this.categoriesService.getSubCategoriesByCategoryId(categoryId).subscribe({
      next: (res) => {
        console.log(' Subcategories Response:', res);
        this.subcategories = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //  When SubCategory Selected
  onSubCategoryClick(subCategoryId: string): void {
    this.selectedSubCategoryId = subCategoryId;
    this.ngxSpinnerService.show();

    this.categoriesService.getProductsBySubCategoryId(subCategoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });
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
