import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rezervacija } from '../models/rezervacija.model';
import { Korisnik } from '../models/korisnik.model';
import { Instruktor } from '../models/instruktor.model';
import { Usluga } from '../models/usluga.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private rezervacijeUrl = 'http://localhost:5000/api/rezervacije';
  private instruktoriUrl = 'http://localhost:5000/api/instruktori';
  private uslugeUrl = 'http://localhost:5000/api/usluge';
  private korisniciUrl = 'http://localhost:5000/api/korisnici';

  constructor(private http: HttpClient) {}

  getActiveUser(): Korisnik | null {
    const user = localStorage.getItem('activeUser');
    return user ? JSON.parse(user) : null;
  }

  getRezervacije(): Observable<Rezervacija[]> {
    return this.http.get<Rezervacija[]>(this.rezervacijeUrl);
  }

  getInstruktori(): Observable<Instruktor[]> {
    return this.http.get<Instruktor[]>(this.instruktoriUrl);
  }

  getUsluge(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.uslugeUrl);
  }

  getKorisnikById(id: number): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.korisniciUrl}/${id}`);
  }

  addRezervacija(payload: {
    korisnik: number;
    instruktor: number;
    usluga: number;
    datum: Date;
  }): Observable<Rezervacija> {
    return this.http.post<Rezervacija>(this.rezervacijeUrl, payload);
  }
}
