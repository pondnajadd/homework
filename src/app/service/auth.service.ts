import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceModel } from '../models/auth-service';
import { ResponseModel } from '../models/response';
import { environment } from '../../environments/environment';
const AUTH_API: string = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  login(
    username: string,
    password: string
  ): Observable<ResponseModel<AuthServiceModel>> {
    return this.http.post<ResponseModel<AuthServiceModel>>(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }
}
