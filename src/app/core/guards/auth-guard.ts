import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);
  //check token

  if (cookieService.get('token')) {
    return true;
  }
  else {
    // navigate to  login
    return router.parseUrl('/login');
  }
};
