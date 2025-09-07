import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../core/auth/services/auth.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {

  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  orders: any[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const decodedToken: any = this.authService.decodeToken();
    const userId = decodedToken?.id || decodedToken?._id;

    if (userId) {
      this.getOrders(userId).subscribe({
        next: (res) => {
          console.log("Full Orders Response:", res);
          this.orders = res;
        },
        error: (err) => console.error("Error fetching orders:", err)
      });
    } else {
      console.error("User ID not found in token!");
    }
  }

  getOrders(userId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${userId}`);
  }

}
