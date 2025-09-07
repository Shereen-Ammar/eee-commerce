import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isloggedGuard: CanActivateFn = (route, state) => {


  const cookieService = inject(CookieService);
  const router = inject(Router);
  //check token

  if (cookieService.get('token')) {
    return router.parseUrl('/login');
  }
  else {
    // navigate to  login
    return true;
  }

};
