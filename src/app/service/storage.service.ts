import { Injectable } from '@angular/core';
import { LoginForm } from '../models/login-form';
import { AuthServiceModel } from '../models/auth-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static readonly USER_KEY = 'user-auth';

  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: AuthServiceModel): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.setItem(StorageService.USER_KEY, JSON.stringify(user));
  }

  public getUser(): AuthServiceModel {
    const user = sessionStorage.getItem(StorageService.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }
}
