// import { Component, Output, EventEmitter } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-order-modal',
//   standalone: true,
//   templateUrl: './order-modal.component.html',
//   styleUrls: ['./order-modal.component.css'],
//   imports: [CommonModule, FormsModule],
// })
// export class OrderModalComponent {
//   quantity = 1;
//   condiments = {
//     ranch: false,
//     blueCheese: false,
//     bbq: false,
//   };

//   @Output() submitOrder = new EventEmitter<{quantity: number, condiments: string}>();
//   @Output() close = new EventEmitter<void>();

//   toggleCondiment(key: keyof typeof this.condiments) {
//     this.condiments[key] = !this.condiments[key];
//   }

//   onSubmit() {
//     const selectedCondiments = Object.entries(this.condiments)
//       .filter(([_, selected]) => selected)
//       .map(([name]) => name.replace(/([A-Z])/g, ' $1').trim())
//       .map(name => name.charAt(0).toUpperCase() + name.slice(1))
//       .join(', ');

//     this.submitOrder.emit({ quantity: this.quantity, condiments: selectedCondiments });
//     this.close.emit();
//   }
// }

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-modal.component.html',
})
export class OrderModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submitOrder = new EventEmitter<any>();

  quantity = 1;
  condiments = {
    ranch: false,
    blueCheese: false,
    bbq: false,
  };

  onSubmit() {
    this.submitOrder.emit({
      quantity: this.quantity,
      condiments: this.condiments,
    });
    this.close.emit();
  }
}

