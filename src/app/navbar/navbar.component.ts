import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from '../service/storage.service';
import { CountdownModule } from 'ngx-countdown';
import { Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CountdownModule,
    RouterModule,
    TimerComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  name: string = '';
  time: string = '';

  constructor(private storage: StorageService, private router: Router) {}
  ngOnInit() {
    this.name = this.storage.getUser().fullName;
  }
  logout() {
    this.storage.clean();
    this.router.navigate(['/login'], {});
  }
}
