import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StaffNotification } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-notification',
  templateUrl: './staff-notification.component.html',
  styleUrls: ['./staff-notification.component.css'],
  imports: [CommonModule]
})
export class StaffNotificationComponent {
  @Input() notification: StaffNotification | null = null;
  @Output() accept = new EventEmitter<void>();

  acceptNotification() {
    this.accept.emit();
  }
}