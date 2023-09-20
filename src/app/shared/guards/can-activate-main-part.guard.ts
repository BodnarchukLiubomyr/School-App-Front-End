import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const canActivateMainPartGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  console.log("CanAccessMainPart guard");
  return storageService.isLoggedIn()
    ? true
    : router.parseUrl('/log-in');
};
