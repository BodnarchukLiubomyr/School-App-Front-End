import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  console.log("CanActivate auth guard");
  return storageService.isLoggedIn()
    ? router.parseUrl('/main-part')
    : true;
};
