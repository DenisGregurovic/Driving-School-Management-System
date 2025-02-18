import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kategorija } from '../models/kategorija.model';

@Injectable({
  providedIn: 'root',
})
export class KategorijeService {
  private apiUrl = 'http://localhost:5000/api/kategorije';

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getKategorije(): Observable<Kategorija[]> {
    return this.http.get<Kategorija[]>(this.apiUrl);
  }

  // Add a new category
  addKategorija(category: Kategorija): Observable<Kategorija> {
    return this.http.post<Kategorija>(this.apiUrl, category);
  }

  // Update a category
  updateKategorija(id: number, category: Kategorija): Observable<Kategorija> {
    return this.http.put<Kategorija>(`${this.apiUrl}/${id}`, category);
  }

  // Delete a category
  deleteKategorija(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
