import { Component } from '@angular/core';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private pushService: PushService
  ) {}

  ngOnInit(){
    this.pushService.init();
    this.pushService.initLocal();
  }

  notificationSchedule(){
    this.pushService.local();
  }
}
