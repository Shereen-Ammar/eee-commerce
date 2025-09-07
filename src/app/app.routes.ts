import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isloggedGuard } from './core/guards/islogged-guard';
import { AllordersComponent } from './features/allorders/allorders.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent,
        canActivate: [isloggedGuard],
        children: [
            { path: 'login', component: LoginComponent, title: "Login page" },
            { path: 'register', component: RegisterComponent, title: "Register page" }
        ]
    },
    {
        path: '', component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: HomeComponent, title: 'Home page' },
            { path: 'cart', component: CartComponent, title: 'cart page' },
            { path: 'products', component: ProductsComponent, title: 'products page' },
            { path: 'brands', component: BrandsComponent, title: 'brands page' },
            { path: 'categories', component: CategoriesComponent, title: 'categories page' },
            { path: 'allorders', component: AllordersComponent, title: 'allorders page' },
            { path: 'details/:slug/:id', component: DetailsComponent, title: 'details page' },
            { path: 'details/:id', component: DetailsComponent, title: 'details page' },
            { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout page' },
        ]
    },
    { path: '**', component: NotfoundComponent, title: 'notfound page' }
];
