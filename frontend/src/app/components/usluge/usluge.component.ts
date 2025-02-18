import { Component, OnInit } from '@angular/core';
import { UslugeService } from '../../services/usluga.service';
import { Usluga } from '../../models/usluga.model';

@Component({
  selector: 'app-usluge',
  standalone: false,
  templateUrl: './usluge.component.html',
  styleUrls: ['./usluge.component.scss'],
})
export class UslugeComponent implements OnInit {
  usluge: Usluga[] = [];
  isEditing: number | null = null; // Dodano svojstvo za praćenje uređivanja
  newUsluga: Usluga = { id: 0, ime: '', opis: '', cijena: 0 };

  constructor(private uslugeService: UslugeService) {}

  ngOnInit(): void {
    this.loadUsluge();
  }

  loadUsluge(): void {
    this.uslugeService.getUsluge().subscribe(
      (data) => {
        this.usluge = data;
      },
      (error) => {
        console.error('Greška prilikom dohvaćanja usluga:', error);
      }
    );
  }

  addUsluga(): void {
    if (!this.newUsluga.ime.trim() || !this.newUsluga.opis.trim() || this.newUsluga.cijena <= 0) {
      alert('Sva polja su obavezna!');
      return;
    }
    const maxId = this.usluge.length ? Math.max(...this.usluge.map((u) => u.id)) : 0;
    const newId = maxId + 1;
    const uslugaToAdd = { ...this.newUsluga, id: newId };

    this.uslugeService.addUsluga(uslugaToAdd).subscribe(
      (usluga) => {
        this.usluge.push(usluga);
        this.newUsluga = { id: 0, ime: '', opis: '', cijena: 0 };
      },
      (error) => {
        console.error('Greška prilikom dodavanja usluge:', error);
      }
    );
  }

  updateUsluga(usluga: Usluga): void {
    if (!usluga.ime.trim() || !usluga.opis.trim() || usluga.cijena <= 0) {
      alert('Sva polja su obavezna!');
      return;
    }

    this.uslugeService.updateUsluga(usluga.id, usluga).subscribe(
      () => {
        this.isEditing = null; // Zatvaranje režima uređivanja
      },
      (error) => {
        console.error('Greška prilikom ažuriranja usluge:', error);
      }
    );
  }

  deleteUsluga(id: number): void {
    if (confirm('Jeste li sigurni da želite obrisati ovu uslugu?')) {
      this.uslugeService.deleteUsluga(id).subscribe(
        () => {
          this.usluge = this.usluge.filter((u) => u.id !== id);
        },
        (error) => {
          console.error('Greška prilikom brisanja usluge:', error);
        }
      );
    }
  }

  editUsluga(id: number): void {
    this.isEditing = id; // Postavljanje ID-a trenutno uređivane usluge
  }

  cancelEdit(): void {
    this.isEditing = null; // Resetiranje režima uređivanja
    this.loadUsluge(); // Ponovno učitavanje usluga za vraćanje izvornog stanja
  }
}
