import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instruktor } from '../models/instruktor.model';
import { Korisnik } from '../models/korisnik.model';

@Injectable({
    providedIn: 'root',
  })
  export class InstruktorService {
    private apiUrl = 'http://localhost:5000/api/instruktori';
    private korisniciApiUrl = 'http://localhost:5000/api/korisnici/role/instruktor';
  
    constructor(private http: HttpClient) {}
  
    getInstruktori(): Observable<Instruktor[]> {
      return this.http.get<Instruktor[]>(this.apiUrl);
    }
  
    getKorisniciInstruktori(): Observable<Korisnik[]> {
      return this.http.get<Korisnik[]>(this.korisniciApiUrl);
    }
  
    addInstruktor(instruktor: Instruktor): Observable<Instruktor> {
      return this.http.post<Instruktor>(this.apiUrl, instruktor);
    }

  updateInstruktor(id: number, instruktor: Instruktor): Observable<Instruktor> {
    return this.http.put<Instruktor>(`${this.apiUrl}/${id}`, instruktor);
  }

  deleteInstruktor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
