import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Korisnik } from '../models/korisnik.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; // Prilagodite prema vašem backendu
  private authChangeSubject = new Subject<void>(); // Subject za praćenje promjena u autentifikaciji
  authChange = this.authChangeSubject.asObservable(); // Observable za pretplatu

  constructor(private http: HttpClient) {}

  // Login metoda
  login(email: string, lozinka: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, lozinka });
  }
  

  // Register metoda
  register(korisnik: Korisnik): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, korisnik);
  }

  // Postavljanje tokena u localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.authChangeSubject.next(); // Emitira promjenu
  }

  // Dohvaćanje tokena iz localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Brisanje tokena (logout)
  clearToken(): void {
    localStorage.removeItem('authToken');
    this.authChangeSubject.next(); // Emitira promjenu
  }

  // Postavljanje aktivnog korisnika u localStorage
  setActiveUser(user: Korisnik): void {
    localStorage.setItem('activeUser', JSON.stringify(user));
    this.authChangeSubject.next(); // Emitira promjenu
  }

  // Dohvaćanje aktivnog korisnika iz localStorage
  getActiveUser(): Korisnik | null {
    const user = localStorage.getItem('activeUser');
    return user ? JSON.parse(user) : null;
  }

  // Brisanje aktivnog korisnika iz localStorage
  clearActiveUser(): void {
    localStorage.removeItem('activeUser');
    this.authChangeSubject.next(); // Emitira promjenu
  }
}
