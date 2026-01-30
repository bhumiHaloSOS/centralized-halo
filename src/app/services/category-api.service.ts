import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
// Define the interface inside the service
export interface CategoryEntry {
  id: number;
  category_name: string;
  notification_status: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
  // Use environment.apiUrl to switch between dev and prod
  private API = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) { console.log('Category API URL:', this.API);}

  // Save a category
  save(category: string): Observable<CategoryEntry> {
    return this.http.post<CategoryEntry>(this.API, { category_name: category });
  }

  // Get the latest category (or null if none)
  getLatest(): Observable<CategoryEntry | null> {
    return this.http.get<CategoryEntry | null>(`${this.API}/latest`);
  }

  // Accept a category by ID
  accept(id: number): Observable<{ success?: boolean; message?: string }> {
    return this.http.put<{ success?: boolean; message?: string }>(`${this.API}/${id}/accept`, {});
  }
}
