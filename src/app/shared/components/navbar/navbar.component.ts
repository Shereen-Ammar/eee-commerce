import { Component, inject, Input, input } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input({ required: true }) isLogin!: boolean;


  constructor(private flowbiteService: FlowbiteService) { }

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  count!: number;


  ngOnInit(): void {


    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCartNumber();

    this.getAllDataCart();


  }


  signOut(): void {
    this.authService.logOut();
  }

  getCartNumber(): void {
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count = value
        console.log(this.count);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



}
