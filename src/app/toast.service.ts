import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'info' | 'error' | 'justArrived';

export interface ToastMessage {
  text: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toast = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this._toast.asObservable();

  /**
   * Show a toast
   * @param message The text message
   * @param type success | info | error
   * @param duration Duration in ms
   */
  show(message: string, type: ToastType = 'success', duration = 4000) {
    this._toast.next({ text: message, type });
    setTimeout(() => this._toast.next(null), duration);
  }
}
