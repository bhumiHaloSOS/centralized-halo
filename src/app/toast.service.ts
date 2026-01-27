import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'info' | 'error' | 'justArrived';

export interface ToastMessage {
  text: string;
  type: string;
  description?: string;
  icon?: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toast = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this._toast.asObservable();

  /**
   * Show a toast
   * @param message The main text
   * @param type success | info | error | justArrived
   * @param options Optional: description, icon, duration
   */
  show(
    message: string,
    type: ToastType,
    options?: { description?: string; icon?: string; duration?: number }
  ): void {
    const duration = options?.duration ?? 5000; // default 5 seconds

    const toast: ToastMessage = {
      text: message,
      type,
      description: options?.description,
      icon: options?.icon,
      duration
    };

    // Emit the toast
    this._toast.next(toast);

    // Hide after duration
    setTimeout(() => {
      this._toast.next(null);
    }, duration);
  }
}
