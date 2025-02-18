import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Korisnik } from '../models/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  private apiUrl = 'http://localhost:5000/api/korisnici';

  constructor(private http: HttpClient) {}

  getKorisnici(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.apiUrl);
  }

  addKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.post<Korisnik>(this.apiUrl, korisnik);
  }

  updateKorisnik(id: number, korisnik: Korisnik): Observable<Korisnik> {
    return this.http.put<Korisnik>(`${this.apiUrl}/${id}`, korisnik);
  }

  deleteKorisnik(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
