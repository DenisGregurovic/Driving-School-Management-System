import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usluga } from '../models/usluga.model';

@Injectable({
  providedIn: 'root',
})
export class UslugeService {
  private apiUrl = 'http://localhost:5000/api/usluge';

  constructor(private http: HttpClient) {}

  getUsluge(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.apiUrl);
  }

  addUsluga(usluga: Usluga): Observable<Usluga> {
    return this.http.post<Usluga>(this.apiUrl, usluga);
  }

  updateUsluga(id: number, usluga: Usluga): Observable<Usluga> {
    return this.http.put<Usluga>(`${this.apiUrl}/${id}`, usluga);
  }

  deleteUsluga(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
