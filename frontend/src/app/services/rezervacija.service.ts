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
export class RezervacijaService {
  private apiUrl = 'http://localhost:5000/api/rezervacije'; // Backend URL za rezervacije
  private korisniciApiUrl = 'http://localhost:5000/api/korisnici';
  private instruktoriApiUrl = 'http://localhost:5000/api/instruktori';
  private uslugeApiUrl = 'http://localhost:5000/api/usluge';

  constructor(private http: HttpClient) {}

  // Dohvati sve rezervacije
  getRezervacije(): Observable<Rezervacija[]> {
    return this.http.get<Rezervacija[]>(this.apiUrl);
  }

  // Dodaj novu rezervaciju
  addRezervacija(rezervacija: {
    korisnik: number;
    instruktor: number;
    usluga: number;
    datum: Date;
  }): Observable<Rezervacija> {
    return this.http.post<Rezervacija>(this.apiUrl, rezervacija);
  }

  // Ažuriraj rezervaciju
  updateRezervacija(
    id: number,
    rezervacija: { korisnik: number; instruktor: number; usluga: number; datum: Date }
  ): Observable<Rezervacija> {
    return this.http.put<Rezervacija>(`${this.apiUrl}/${id}`, rezervacija);
  }
  

  // Obriši rezervaciju
  deleteRezervacija(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Dohvati sve korisnike
  getKorisnici(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.korisniciApiUrl}?role=korisnik`);
  }

  // Dohvati sve instruktore
  getInstruktori(): Observable<Instruktor[]> {
    return this.http.get<Instruktor[]>(this.instruktoriApiUrl);
  }

  // Dohvati sve usluge
  getUsluge(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.uslugeApiUrl);
  }

  // Dohvati korisnika po ID-u
  getKorisnikById(id: number): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.korisniciApiUrl}/${id}`);
  }
  
}
