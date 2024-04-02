import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { ExamService } from '../service/exam.service';
import { CategoriesModel } from '../models/categories';
import { DialogModule } from '@angular/cdk/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatListModule, MatIcon, ErrorDialogComponent, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private examService: ExamService, private dialog: MatDialog) {}
  links!: CategoriesModel[];
  showInfo(_t3: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.GetCategories();
  }
  private GetCategories() {
    this.examService.categories().subscribe({
      next: (data) => {
        if (data.isSuccess) this.links = data.data;
        console.log(data);
      },

      error: (data) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: data.message },
        });
      },
    });
  }
}
