import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toast: Observable<ToastMessage | null>;

  constructor(private toastService: ToastService) {
    this.toast = this.toastService.toast$;
  }

  // -------------------------
  // Toast Functions
  // -------------------------
  callServer() { 
  this.toastService.show('Server has been notified!', 'success', {
    description: 'A team member will be with you shortly.',
    icon: 'check-circle'
  });
}

orderWings() {
  this.toastService.show('Food ordered!', 'justArrived', {
    description: 'Your order is being prepared.',
    icon: 'hourglass-half'
  });
}

janitor() {
  this.toastService.show('Janitor requested!', 'info', {
    description: 'Cleaning staff will arrive soon.',
    icon: 'exclamation-circle'
  });
}

emergency() {
  this.toastService.show('EMERGENCY ALERT!', 'error', {
    description: 'Security Services Have Been Notified.',
    icon: 'exclamation-circle'
  });
}


  // -------------------------
  // Custom Cursor
  // -------------------------
  ngOnInit() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
}
