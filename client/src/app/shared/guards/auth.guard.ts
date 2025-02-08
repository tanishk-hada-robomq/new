import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { delay, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.validateToken().pipe(
    map(isAuthenticated => {
      if(isAuthenticated){
        return true;
      }else{
        router.navigate(['/login']);
        return false;
      }
    })
  )
};
