import { Component } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { ActivatedRoute } from '@angular/router';
import {
  QuestionAnswerInfo,
  QuestionInfo,
  QuestionsModels,
} from '../models/questions';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { StorageService } from '../service/storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Answer,
  AnswersSubmit,
  AssignmentSubmit,
  Question,
} from '../models/answers-submit';
import { ExamResultComponent } from '../exam-result/exam-result.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    MatListModule,
    MatIcon,
    NavbarComponent,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  isChecked(ansId: string): boolean {
    return this.formList[this.no].value.answer == ansId;
  }
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private storage: StorageService,
    private formBuilder: FormBuilder
  ) {}
  selectAnswer($event: any, answerId: string, questionId: string) {
    if (this.formList[this.no]) {
      let currentSelected: string[] = this.formList[this.no].value.answer || [];

      if (currentSelected.some((x) => x == answerId)) {
        currentSelected = currentSelected?.filter((z) => z != answerId);
      } else currentSelected.push(answerId);
      this.formList[this.no].get('answer')?.setValue(currentSelected);
      this.formList[this.no].get('answer')?.setErrors(null);

      this.storage.saveAnswers(this.catId, answerId);

      console.log(this.formList);
    }
  }
  submitAnswer() {
    const obj = new AssignmentSubmit();
    obj.questionCategoryId = this.catId;
    obj.questions = [];
    this.formList.forEach((f) => {
      const answers: Answer[] = [];

      for (let i = 0; i < f.value.answer.length; i++) {
        const questionAnswerId = f.value.answer[i];
        answers.push({ questionAnswerId: questionAnswerId });
      }

      const data: Question = {
        questionId: f.value.questionId,
        answers: answers,
      };

      obj.questions.push(data);
    });

    this.examService.submitAssignment(obj).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          let dialogRef = this.dialog.open(ExamResultComponent, {
            height: '400px',
            width: '600px',
            data: {
              score: res.data.score,
              fullscore: res.data.fullScore,
            },
          });
        }
      },
      error: (data) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: data.message },
        });
      },
    });
  }

  answerAssignment = <AssignmentSubmit>{
    questionCategoryId: '',
    questions: [],
  };
  answers: QuestionAnswerInfo[] = [];
  checked: string[] = [];
  questions!: QuestionsModels;
  no: number = 0;
  formList: Array<FormGroup> = [];
  prevQuestion() {
    this.no = this.no - 1;
    this.answers = this.questions.questionInfo[this.no].questionAnswerInfo;
  }
  catId: string = '';

  nextQuestion() {
    this.no = this.no + 1;
    this.answers = this.questions.questionInfo[this.no].questionAnswerInfo;
  }

  ngOnInit() {
    this.catId = String(this.route.snapshot.paramMap.get('id'));
    this.GetQuestion();

    this.questions.questionInfo.forEach((x) => {
      this.formList.push(this.buildForm(x));
    });
    this.answers = this.questions.questionInfo[this.no].questionAnswerInfo;
  }

  private GetQuestion() {
    this.examService.questions(this.catId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.storage.saveExam(res.data);
          this.questions = res.data;
          res.data.questionInfo.forEach((x) => {
            this.formList.push(this.buildForm(x));
          });
          this.answers = res.data.questionInfo[this.no].questionAnswerInfo;
        }
      },

      error: (data) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: data.message },
        });
      },
    });
  }

  buildForm(item: QuestionInfo): FormGroup<any> {
    return this.formBuilder.group({
      questionId: [item.questionId, Validators.required],
      answer: ['', Validators.required],
    });
  }
}
