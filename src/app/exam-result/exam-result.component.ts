import { Component, Inject, Input, ViewChild, input } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [NgApexchartsModule, MatButtonModule],
  templateUrl: './exam-result.component.html',
  styleUrl: './exam-result.component.css',
})
export class ExamResultComponent {
  NavigateCategories() {
    this.dialogRef.close();

    this.route.navigate(['categories']);
  }
  constructor(
    private route: Router,
    public dialogRef: MatDialogRef<ExamResultComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  @ViewChild('chart')
  chart!: ChartComponent;
  public chartOptions?: Partial<ChartOptions>;
  ngOnInit() {
    let pecentage: number = 0;
    console.log(this.data);
    if (this.data.score <= 0) {
      this.data.score = 0;
    } else pecentage = (this.data.score * 100) / this.data.fullscore;
    let diff_percen = 100 - pecentage;
    this.chartOptions = {
      series: [pecentage, diff_percen],
      chart: {
        width: 380,
        type: 'pie',
      },

      labels: ['ถูก', 'ผิด'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      colors: ['#22e6d8', '#969696'],
    };
  }
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
};
