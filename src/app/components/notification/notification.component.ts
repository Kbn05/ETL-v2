import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() message: string = '';
  messageNotification: any = {};

  statusMessages = [
    { message: 'COLLECTING_DATA', img: '/loading.gif' },
    { message: 'DATA_NOT_FOUND', img: '/error.png' },
    { message: 'PRECONDITION_REQUIRED', img: '/error.png' },
    { message: 'DATA_FOUND', img: '/check.png' },
    { message: 'INTERNAL_SERVER_ERROR', img: '/error.png' }
  ];

  ngOnInit(): void {
    this.setMessageNotification();
    setTimeout(() => {
      this.message = '';
      this.messageNotification = {};
    }, 5000);
  }

  private setMessageNotification(): void {
    this.messageNotification = this.statusMessages.find(status => status.message === this.message) || {};
  }
}
