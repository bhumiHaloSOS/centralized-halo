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

  callServer() { this.toastService.show('Server has been notified! 📞', 'success'); }
  orderWings() { this.toastService.show('Chicken just arrived! 🍗', 'justArrived'); }
  janitor() { this.toastService.show('Janitor requested! 🧹', 'info'); }
  emergency() { this.toastService.show('Emergency alert! ⚠️', 'error'); }
}
