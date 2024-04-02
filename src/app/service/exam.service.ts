import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesModel } from '../models/categories';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ResponseModel } from '../models/response';
import { QuestionsModels } from '../models/questions';
import { environment } from '../../environments/environment';
const API: string = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient, private storage: StorageService) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getUser().accessToken,
    }),
  };
  categories(): Observable<ResponseModel<CategoriesModel[]>> {
    return this.http.get<ResponseModel<CategoriesModel[]>>(
      API + 'questions/categories',
      this.httpOptions
    );
  }
  questions(id: string): Observable<ResponseModel<QuestionsModels>> {
    return this.http.get<ResponseModel<QuestionsModels>>(
      API + 'questions/categories/' + id,
      this.httpOptions
    );
  }
}
