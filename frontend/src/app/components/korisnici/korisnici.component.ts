import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../../services/korisnici.service';
import { Korisnik } from '../../models/korisnik.model';

@Component({
  selector: 'app-korisnici',
  standalone: false,
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.scss'],
})
export class KorisniciComponent implements OnInit {
  korisnici: Korisnik[] = [];
  newKorisnik: Korisnik = {
    id: 0,
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    razina_prava: 'korisnik',
  };

  constructor(private korisniciService: KorisniciService) {}

  ngOnInit(): void {
    this.loadKorisnici();
  }

  loadKorisnici(): void {
    this.korisniciService.getKorisnici().subscribe(
      (data) => {
        this.korisnici = data;
      },
      (error) => {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
      }
    );
  }

  addKorisnik(): void {
    if (this.isValidUser(this.newKorisnik)) {
      if (this.korisnici.some((k) => k.email === this.newKorisnik.email)) {
        alert('Email već postoji!');
        return;
      }

      this.korisniciService.addKorisnik(this.newKorisnik).subscribe(
        (korisnik) => {
          this.korisnici.push(korisnik);
          this.newKorisnik = {
            id: 0,
            ime: '',
            prezime: '',
            email: '',
            lozinka: '',
            razina_prava: 'korisnik',
          };
        },
        (error) => {
          console.error('Greška prilikom dodavanja korisnika:', error);
        }
      );
    }
  }

  editKorisnik(korisnik: Korisnik): void {
    korisnik.isEditing = true;
  }

  updateKorisnik(korisnik: Korisnik): void {
    if (this.korisnici.some((k) => k.email === korisnik.email && k.id !== korisnik.id)) {
      alert('Email već postoji!');
      return;
    }

    if (!this.isValidUpdatedUser(korisnik)) {
      alert('Unesite ispravne podatke!');
      return;
    }

    this.korisniciService.updateKorisnik(korisnik.id, korisnik).subscribe(
      () => {
        korisnik.isEditing = false;
      },
      (error) => {
        console.error('Greška prilikom ažuriranja korisnika:', error);
      }
    );
  }

  cancelEdit(korisnik: Korisnik): void {
    this.loadKorisnici(); // Ponovno učitavanje originalnih podataka
    korisnik.isEditing = false;
  }

  deleteKorisnik(id: number): void {
    this.korisniciService.deleteKorisnik(id).subscribe(
      () => {
        this.korisnici = this.korisnici.filter((k) => k.id !== id);
      },
      (error) => {
        console.error('Greška prilikom brisanja korisnika:', error);
      }
    );
  }

  isValidUser(korisnik: Korisnik): boolean {
    return (
      korisnik.ime.trim().length > 0 &&
      korisnik.prezime.trim().length > 0 &&
      this.isValidEmail(korisnik.email) &&
      korisnik.lozinka.trim().length > 0 &&
      korisnik.razina_prava.trim().length > 0
    );
  }

  isValidUpdatedUser(korisnik: Korisnik): boolean {
    return (
      korisnik.ime.trim().length > 0 &&
      korisnik.prezime.trim().length > 0 &&
      this.isValidEmail(korisnik.email)
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
