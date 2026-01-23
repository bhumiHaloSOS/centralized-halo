// import { Injectable, Inject } from '@angular/core';

// export type StaffNotificationType = 'server' | 'arrival' | 'janitor' | 'emergency';

// export interface StaffNotification {
//   type: StaffNotificationType;
//   timestamp: Date;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   constructor(@Inject(ToastrService) private toastr: ToastrService) {}

//   notifyServer() {
//     this.toastr.success('Server has been notified!', 'Info');
//   }

//   notifyOrder(quantity: number, condiments: string) {
//     const text = condiments ? ` with ${condiments}` : '';
//     this.toastr.success(`${quantity} order(s)${text}. Your order is being prepared.`, 'Order Placed');
//   }

//   notifyJanitor() {
//     this.toastr.info('Cleaning staff will arrive soon.', 'Janitor Requested');
//   }

//   notifyEmergency() {
//     this.toastr.error('Security Services Have Been Notified.', 'EMERGENCY ALERT!');
//   }
// }
