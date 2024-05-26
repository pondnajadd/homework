import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  display: string = '';
  timeLimitOfMinuteUnit: number = 0;
  startTimer(timeLimit: number): string {
    return this.timer(this.timeLimitOfMinuteUnit);
  }

  timer(minute: number): string {
    let timeText = ' ';
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      timeText = `เหลือเวลา ${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
    return timeText;
  }
}
