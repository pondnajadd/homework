import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from '../service/storage.service';
import { CountdownModule } from 'ngx-countdown';
import { Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { TimerService } from '../service/timer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CountdownModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private storage: StorageService,
    private router: Router,
    private timerService: TimerService
  ) {}
  name: string = '';
  time: string = this.timerService.display;

  ngOnInit() {
    this.name = this.storage.getUser().fullName
      ? this.storage.getUser().fullName
      : '';
    // this.time = this.timerService.startTimer();
  }
  logout() {
    this.storage.clean();
    this.router.navigate(['/login'], {});
  }
}
