import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './service/storage.service';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const guardAuthenGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  if (storageService.isLoggedIn() && !storageService.sessionExpired())
    return true;
  else return false;
};
