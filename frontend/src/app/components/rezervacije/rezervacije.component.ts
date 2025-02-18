import { Component, OnInit } from '@angular/core';
import { RezervacijaService } from '../../services/rezervacija.service';
import { Korisnik } from '../../models/korisnik.model';
import { Instruktor } from '../../models/instruktor.model';
import { Usluga } from '../../models/usluga.model';
import { Rezervacija } from '../../models/rezervacija.model';

@Component({
  selector: 'app-rezervacije',
  standalone: false,
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.scss'],
})
export class RezervacijeComponent implements OnInit {
  rezervacije: Rezervacija[] = [];
  korisnici: Korisnik[] = [];
  instruktori: Instruktor[] = [];
  usluge: Usluga[] = [];

  selectedKorisnik: string = '';
  selectedInstruktor: string = '';
  selectedUsluga: string = '';
  newRezervacija: Rezervacija = {
    id: 0,
    korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: 'korisnik' },
    instruktor: { id: 0, korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' }, kategorije: [] },
    usluga: { id: 0, ime: '', opis: '', cijena: 0 },
    datum: new Date(),
  };

  constructor(private rezervacijaService: RezervacijaService) {}

  ngOnInit(): void {
    this.loadRezervacije();
    this.loadKorisnici();
    this.loadInstruktori();
    this.loadUsluge();
  }

  loadRezervacije(): void {
    this.rezervacijaService.getRezervacije().subscribe((data) => {
      this.rezervacije = data;

     // Riješi instruktora za svaku rezervaciju
this.rezervacije.forEach((rezervacija) => {
  if (typeof rezervacija.instruktor.korisnik === 'number') {
    // Ako instruktor.korisnik sadrži samo ID, dohvaćamo cijelog korisnika
    this.rezervacijaService.getKorisnikById(rezervacija.instruktor.korisnik).subscribe((korisnik) => {
      rezervacija.instruktor.korisnik = korisnik;
    });
  }
});

    });
  }

  loadKorisnici(): void {
    this.rezervacijaService.getKorisnici().subscribe((data) => {
      this.korisnici = data.filter((korisnik) => korisnik.razina_prava === 'korisnik');
    });
  }

  loadInstruktori(): void {
    this.rezervacijaService.getInstruktori().subscribe((data) => (this.instruktori = data));
  }

  loadUsluge(): void {
    this.rezervacijaService.getUsluge().subscribe((data) => (this.usluge = data));
  }

  selectKorisnik(imePrezime: string): void {
    const [ime, prezime] = imePrezime.split(' ');
    const korisnik = this.korisnici.find((k) => k.ime === ime && k.prezime === prezime);
    if (korisnik) {
      this.newRezervacija.korisnik = korisnik;
    }
  }

  selectInstruktor(imePrezime: string): void {
    const [ime, prezime] = imePrezime.split(' ');
    const instruktor = this.instruktori.find(
      (i) => i.korisnik.ime === ime && i.korisnik.prezime === prezime
    );
    if (instruktor) {
      this.newRezervacija.instruktor = {
        id: instruktor.korisnik.id || 0, // Postavljamo 0 ako je id undefined
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
    const korisnik = this.korisnici.find(
      (k) => k.ime + ' ' + k.prezime === this.selectedKorisnik
    );
    const instruktor = this.instruktori.find(
      (i) => i.korisnik.ime + ' ' + i.korisnik.prezime === this.selectedInstruktor
    );
    const usluga = this.usluge.find((u) => u.ime === this.selectedUsluga);
  
    if (!korisnik || !instruktor || !usluga) {
      alert('Molimo odaberite sve podatke prije dodavanja rezervacije.');
      return;
    }
  
    // Kreiranje payload-a sa samo ID-evima
    const payload = {
      korisnik: korisnik.id,
      instruktor: instruktor.korisnik.id, // ID korisnika koji je instruktor
      usluga: usluga.id,
      datum: this.newRezervacija.datum,
    };
  
    this.rezervacijaService.addRezervacija(payload).subscribe(
      (rezervacija) => {
        this.rezervacije.push(rezervacija);
        this.resetForm();
      },
      (error) => {
        console.error('Greška prilikom dodavanja rezervacije:', error);
        alert('Dogodila se greška prilikom dodavanja rezervacije.');
      }
    );
  }

  deleteRezervacija(id: number): void {
    this.rezervacijaService.deleteRezervacija(id).subscribe(() => {
      this.rezervacije = this.rezervacije.filter((rezervacija) => rezervacija.id !== id);
    });
  }
  

  isValidRezervacija(): boolean {
    return (
      this.newRezervacija.korisnik.id > 0 &&
      this.newRezervacija.instruktor.id > 0 &&
      this.newRezervacija.usluga.id > 0 &&
      !!this.newRezervacija.datum
    );
  }
  isValidRezervacijaEdit(rezervacija: Rezervacija): boolean {
    return (
      rezervacija.korisnik.id > 0 &&
      rezervacija.instruktor.korisnik.id > 0 &&
      rezervacija.usluga.id > 0 &&
      !!rezervacija.datum
    );
  }
  

  resetForm(): void {
    this.selectedKorisnik = '';
    this.selectedInstruktor = '';
    this.selectedUsluga = '';
    this.newRezervacija = {
      id: 0,
      korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: 'korisnik' },
      instruktor: { id: 0, korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' }, kategorije: [] },
      usluga: { id: 0, ime: '', opis: '', cijena: 0 },
      datum: new Date(),
    };
  }
  editRezervacijaBackup: { [key: number]: Rezervacija } = {};


  editRezervacija(rezervacija: Rezervacija): void {
    rezervacija.isEditing = true;
    this.editRezervacijaBackup[rezervacija.id] = JSON.parse(JSON.stringify(rezervacija));
  }
  
  cancelEditRezervacija(rezervacija: Rezervacija): void {
    const backup = this.editRezervacijaBackup[rezervacija.id];
    if (backup) {
      rezervacija.korisnik = backup.korisnik;
      rezervacija.instruktor = backup.instruktor;
      rezervacija.usluga = backup.usluga;
      rezervacija.datum = backup.datum;
      rezervacija.isEditing = false;
      delete this.editRezervacijaBackup[rezervacija.id];
    }
  }
  
  saveRezervacija(rezervacija: Rezervacija): void {
    const payload = {
      korisnik: rezervacija.korisnik.id,
      instruktor: rezervacija.instruktor.korisnik.id,
      usluga: rezervacija.usluga.id,
      datum: rezervacija.datum,
    };
    this.rezervacijaService.updateRezervacija(rezervacija.id, payload).subscribe(
      (updatedRezervacija) => {
        rezervacija.isEditing = false;
      },
      (error) => {
        console.error('Greška prilikom spremanja rezervacije:', error);
        alert('Dogodila se greška prilikom spremanja rezervacije.');
      }
    );
    this.ngOnInit();
  }
  


isEditingRezervacijaValid(rezervacija: Rezervacija): boolean {
  return (
    rezervacija.korisnik.id > 0 &&
    rezervacija.instruktor.id > 0 &&
    rezervacija.usluga.id > 0 &&
    !!rezervacija.datum
  );
}
}
