import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandsService } from './services/brands.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  private readonly brandsService = inject(BrandsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  brands: any[] = [];

  ngOnInit(): void {
    this.loadAllBrands();
  }

  loadAllBrands(): void {
    this.ngxSpinnerService.show();
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.brands = res.data;
        console.log('Brands:', this.brands);
        this.ngxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();
      }
    });
  }

}
