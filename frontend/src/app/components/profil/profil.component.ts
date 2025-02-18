import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil.service';
import { Korisnik } from '../../models/korisnik.model';
import { Instruktor } from '../../models/instruktor.model';
import { Usluga } from '../../models/usluga.model';
import { Rezervacija } from '../../models/rezervacija.model';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  rezervacije: Rezervacija[] = [];
  instruktori: Instruktor[] = [];
  usluge: Usluga[] = [];
  activeUser: Korisnik | null = null;

  selectedInstruktor: string = '';
  selectedUsluga: string = '';
  newRezervacija: Rezervacija = {
    id: 0,
    korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' },
    instruktor: {
      id: 0,
      korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' },
      kategorije: [],
    },
    usluga: { id: 0, ime: '', opis: '', cijena: 0 },
    datum: new Date(),
  };

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.loadActiveUser();
    this.loadRezervacije();
    this.loadInstruktori();
    this.loadUsluge();
  }

  loadActiveUser(): void {
    this.activeUser = this.profilService.getActiveUser();
    if (this.activeUser) {
      this.newRezervacija.korisnik = this.activeUser;
    }
  }

  loadRezervacije(): void {
    if (this.activeUser) {
      this.profilService.getRezervacije().subscribe((data) => {
        // Filtriramo rezervacije za aktivnog korisnika
        this.rezervacije = data.filter(
          (rezervacija) => rezervacija.korisnik.email === this.activeUser?.email
        );
  
        // Prolazimo kroz rezervacije da dohvatimo ime i prezime instruktora
        this.rezervacije.forEach((rezervacija) => {
          const instruktorId = rezervacija.instruktor.korisnik;
          if (typeof instruktorId === 'number') {
            // Ako je instruktor.korisnik ID, dohvatamo podatke
            this.profilService.getKorisnikById(instruktorId).subscribe((korisnik) => {
              // Ažuriramo korisnika u rezervaciji
              rezervacija.instruktor.korisnik = korisnik;
            });
          }
        });
      });
    }
  }
  

  loadInstruktori(): void {
    this.profilService.getInstruktori().subscribe((data) => {
      this.instruktori = data.map((instruktor) => ({
        ...instruktor,
        id: instruktor.korisnik?.id || 0,
      }));
    });
  }

  loadUsluge(): void {
    this.profilService.getUsluge().subscribe((data) => (this.usluge = data));
  }

  selectInstruktor(imePrezime: string): void {
    const [ime, prezime] = imePrezime.split(' ');
    const instruktor = this.instruktori.find(
      (i) => i.korisnik.ime === ime && i.korisnik.prezime === prezime
    );
    if (instruktor) {
      this.newRezervacija.instruktor = {
        id: instruktor.korisnik.id || 0,
        korisnik: instruktor.korisnik,
        kategorije: instruktor.kategorije,
      };
    }
  }

  selectUsluga(ime: string): void {
    const usluga = this.usluge.find((u) => u.ime === ime);
    if (usluga) {
      this.newRezervacija.usluga = usluga;
    }
  }

  addRezervacija(): void {
    if (this.activeUser) {
      const payload = {
        korisnik: this.activeUser.id,
        instruktor: this.newRezervacija.instruktor.id,
        usluga: this.newRezervacija.usluga.id,
        datum: this.newRezervacija.datum,
      };

      this.profilService.addRezervacija(payload).subscribe((rezervacija) => {
        this.rezervacije.push(rezervacija);
        this.resetForm();
        this.loadRezervacije();
      });
    }
  }

  isValidRezervacija(): boolean {
    return (
      this.newRezervacija.instruktor.id > 0 &&
      this.newRezervacija.usluga.id > 0 &&
      !!this.newRezervacija.datum
    );
  }

  resetForm(): void {
    this.selectedInstruktor = '';
    this.selectedUsluga = '';
    this.newRezervacija.datum = new Date();
  }
}
