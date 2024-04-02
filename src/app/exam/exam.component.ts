import { Component } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionsModels } from '../models/questions';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [MatListModule, MatIcon],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  questions!: QuestionsModels;
  ngOnInit() {
    this.GetCategories();
  }
  private GetCategories() {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.examService.questions(id).subscribe({
      next: (res) => {
        if (res.isSuccess) this.questions = res.data;
        console.log(res);
      },

      error: (data) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: data.message },
        });
      },
    });
  }
}
