import { Component, OnInit } from '@angular/core';
import { KategorijeService } from '../../services/kategorija.service';
import { Kategorija } from '../../models/kategorija.model';

@Component({
  selector: 'app-kategorije',
  standalone: false,
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.scss'],
})
export class KategorijeComponent implements OnInit {
  kategorije: Kategorija[] = [];
  isEditing: number | null = null; // ID kategorije koja se uređuje
  originalKategorija: Partial<Kategorija> = {}; // Čuvanje originalnih vrijednosti za otkazivanje
  newKategorija: Kategorija = { id: 0, ime: '', opis: '' }; // Za dodavanje novih kategorija

  constructor(private kategorijeService: KategorijeService) {}

  ngOnInit(): void {
    this.loadKategorije();
  }

  // Dohvaćanje svih kategorija
  loadKategorije(): void {
    this.kategorijeService.getKategorije().subscribe(
      (data) => {
        this.kategorije = data;
      },
      (error) => {
        console.error('Greška pri dohvaćanju kategorija:', error);
      }
    );
  }

  // Dodavanje nove kategorije
  addKategorija(): void {
    if (!this.newKategorija.ime.trim() || !this.newKategorija.opis.trim()) {
      alert('Ime i opis su obavezni!');
      return;
    }

    const maxId = this.kategorije.length
      ? Math.max(...this.kategorije.map((category) => category.id))
      : 0;
    const newId = maxId + 1;

    const categoryToAdd = { ...this.newKategorija, id: newId };

    this.kategorijeService.addKategorija(categoryToAdd).subscribe(
      (category) => {
        this.kategorije.push(category);
        this.newKategorija = { id: 0, ime: '', opis: '' }; // Resetiranje forme
      },
      (error) => {
        console.error('Greška pri dodavanju kategorije:', error);
      }
    );
  }

  // Početak uređivanja kategorije
  editKategorija(id: number): void {
    this.isEditing = id;
    const category = this.kategorije.find((cat) => cat.id === id);
    if (category) {
      this.originalKategorija = { ...category }; // Čuvanje originalnih vrijednosti
    }
  }

  // Spremanje izmjena u kategoriji
  updateKategorija(category: Kategorija): void {
    if (!category.ime.trim() || !category.opis.trim()) {
      alert('Ime i opis su obavezni!');
      return;
    }

    this.kategorijeService.updateKategorija(category.id, category).subscribe(
      () => {
        this.isEditing = null; // Izlazak iz načina uređivanja
        this.originalKategorija = {}; // Brisanje spremljenih originalnih vrijednosti
      },
      (error) => {
        console.error('Greška pri ažuriranju kategorije:', error);
      }
    );
  }

  // Otkazivanje uređivanja
  cancelEdit(): void {
    if (this.isEditing) {
      const index = this.kategorije.findIndex((cat) => cat.id === this.isEditing);
      if (index !== -1 && this.originalKategorija) {
        this.kategorije[index] = { ...this.originalKategorija } as Kategorija;
      }
    }
    this.isEditing = null;
    this.originalKategorija = {};
  }

  // Brisanje kategorije
  deleteKategorija(id: number): void {
    if (!confirm('Jeste li sigurni da želite obrisati ovu kategoriju?')) {
      return;
    }

    this.kategorijeService.deleteKategorija(id).subscribe(
      () => {
        this.kategorije = this.kategorije.filter((cat) => cat.id !== id);
      },
      (error) => {
        console.error('Greška pri brisanju kategorije:', error);
      }
    );
  }
}
