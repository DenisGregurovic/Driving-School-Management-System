// instruktor.component.ts
import { Component, OnInit } from '@angular/core';
import { InstruktorService } from '../../services/instruktor.service';
import { Instruktor } from '../../models/instruktor.model';
import { Korisnik } from '../../models/korisnik.model';

@Component({
  selector: 'app-instruktori',
  standalone: false,
  templateUrl: './instruktori.component.html',
  styleUrls: ['./instruktori.component.scss'],
})
export class InstruktoriComponent implements OnInit {
  instruktori: Instruktor[] = [];
  korisniciInstruktori: Korisnik[] = [];
  newInstruktor: Instruktor = {
    korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' },
    kategorije: [],
  };

  selectedKorisnik: string = ''; // Odabrano ime i prezime iz dropdowna

  constructor(private instruktorService: InstruktorService) {}

  ngOnInit(): void {
    this.loadInstruktori();
    this.loadKorisniciInstruktori();
  }

  loadInstruktori(): void {
    this.instruktorService.getInstruktori().subscribe((data) => {
      this.instruktori = data;
    });
  }

  loadKorisniciInstruktori(): void {
    this.instruktorService.getKorisniciInstruktori().subscribe((data) => {
      this.korisniciInstruktori = data;
    });
  }

  selectKorisnik(imePrezime: string): void {
    const [ime, prezime] = imePrezime.split(' ');
    const korisnik = this.korisniciInstruktori.find((k) => k.ime === ime && k.prezime === prezime);
    if (korisnik) {
      this.newInstruktor.korisnik = korisnik;
    }
  }

  addInstruktor(): void {
    if (!this.isValidInstruktor(this.newInstruktor)) return;

    this.instruktorService.addInstruktor(this.newInstruktor).subscribe((instruktor) => {
      this.instruktori.push(instruktor);
      this.newInstruktor = { korisnik: { id: 0, ime: '', prezime: '', email: '', lozinka: '', razina_prava: '' }, kategorije: [] };
    });
    this.ngOnInit();
  }

  isValidInstruktor(instruktor: Instruktor): boolean {
    return instruktor.korisnik.id > 0 && instruktor.kategorije.length > 0;
  }
  editInstruktor(instruktor: Instruktor): void {
    instruktor.isEditing = true;
  }
  
  updateInstruktor(instruktor: Instruktor): void {
    this.instruktorService.updateInstruktor(instruktor.korisnik.id, instruktor).subscribe(
      () => {
        instruktor.isEditing = false;
        this.loadInstruktori();
      },
      (error: any) => {
        console.error('Greška prilikom ažuriranja instruktora:', error);
      }
    );
   this.loadInstruktori();
  }
  
  deleteInstruktor(id: number): void {
    this.instruktorService.deleteInstruktor(id).subscribe(
      () => {
        this.instruktori = this.instruktori.filter((i) => i.korisnik.id !== id);
      },
      (error: any) => {
        console.error('Greška prilikom brisanja instruktora:', error);
      }
    );
    this.ngOnInit();
  }
}