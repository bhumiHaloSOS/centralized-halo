import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryApiService } from '../services/category-api.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface CategoryEntry {
  id: number;
  category_name: string;
  notification_status: string;
  created_at: string;
}

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
  latestCategory: CategoryEntry | null = null;
  accepted = false;

  constructor(private categoryApi: CategoryApiService) {}

  ngOnInit() {
    // Poll latest entry every 2 seconds
    interval(2000)
      .pipe(switchMap(() => this.categoryApi.getLatest()))
      .subscribe(entry => {
        this.latestCategory = entry;
        this.accepted = false; // reset accept button when new entry comes
      });
  }

  acceptEntry() {
    if (!this.latestCategory) return;

    this.categoryApi.accept(this.latestCategory.id).subscribe(() => {
      this.latestCategory = null; 
    });
  }

  getBackground() {
    if (!this.latestCategory || this.accepted) return 'bg-white text-black';
    switch (this.latestCategory.category_name) {
      case 'call': return 'bg-blue-500 text-white';
      case 'food': return 'bg-orange-500 text-white';
      case 'janitor': return 'bg-cyan-500 text-white';
      case 'emergency': return 'bg-red-500 text-white';
      default: return 'bg-gray-300 text-black';
    }
  }

  getMessage() {
    if (!this.latestCategory || this.accepted) return 'Halo';
    switch (this.latestCategory.category_name) {
      case 'call': return 'Go to Suits 1';
      case 'food': return 'Order Received!';
      case 'janitor': return 'CleanUp Suits 1';
      case 'emergency': return 'Go to Muster Point';
      default: return '';
    }
  }

  getIcon() {
    if (!this.latestCategory || this.accepted) return '';
    switch (this.latestCategory.category_name) {
      case 'call': return 'la-bell';
      case 'food': return 'la-drumstick-bite';
      case 'janitor': return 'la-tint';
      case 'emergency': return 'la-exclamation-triangle';
      default: return '';
    }
  }
}
