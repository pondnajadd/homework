import { Injectable } from '@angular/core';
import { LoginForm } from '../models/login-form';
import { AuthServiceModel } from '../models/auth-service';
import { QuestionsModels } from '../models/questions';
import { AnswersSubmit } from '../models/answers-submit';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static readonly USER_KEY = 'user-auth';
  public static readonly EXAM_KEY = 'exam-question';
  public static readonly ANS_KEY = 'ans-key';

  clean(): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.removeItem(StorageService.EXAM_KEY);
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
  public sessionExpired(): boolean {
    const c = this.getUser();
    return c.expiredDate >= new Date();
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }
  public saveExam(question: QuestionsModels): void {
    sessionStorage.removeItem(StorageService.EXAM_KEY);
    sessionStorage.setItem(StorageService.EXAM_KEY, JSON.stringify(question));
  }
  public saveAnswers(questionId: string, AnswerId: string) {
    sessionStorage.removeItem(StorageService.ANS_KEY);
   
    sessionStorage.setItem(StorageService.ANS_KEY, JSON.stringify(AnswerId));
  }
  public getExam(): QuestionsModels {
    const exam = sessionStorage.getItem(StorageService.EXAM_KEY);
    return exam ? JSON.parse(exam) : null;
  }
}
