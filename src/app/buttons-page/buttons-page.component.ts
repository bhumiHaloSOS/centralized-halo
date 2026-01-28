import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './../toast.service';
import { Observable } from 'rxjs';
import { CategoryApiService } from './../services/category-api.service';

@Component({
  selector: 'app-buttons-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons-page.component.html',
  styleUrls: ['./buttons-page.component.css']
})

export class ButtonsPageComponent {
  toast: Observable<ToastMessage | null>;

  constructor(private toastService: ToastService, private categoryApi: CategoryApiService) {
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
  this.categoryApi.save('call').subscribe();
}

orderWings() {
  this.toastService.show('Food ordered!', 'justArrived', {
    description: 'Your order is being prepared.',
    icon: 'hourglass-half'
  });
  this.categoryApi.save('food').subscribe();
}

janitor() {
  this.toastService.show('Janitor requested!', 'info', {
    description: 'Cleaning staff will arrive soon.',
    icon: 'exclamation-circle'
  });
  this.categoryApi.save('janitor').subscribe();
}

emergency() {
  this.toastService.show('EMERGENCY ALERT!', 'error', {
    description: 'Security Services Have Been Notified.',
    icon: 'exclamation-circle'
  });
  this.categoryApi.save('emergency').subscribe();
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

