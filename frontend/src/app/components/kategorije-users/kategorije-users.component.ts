import { Component, OnInit } from '@angular/core';
import { KategorijeService } from '../../services/kategorija.service';
import { Kategorija } from '../../models/kategorija.model';

@Component({
  selector: 'app-kategorije-users',
  standalone: false,
  templateUrl: './kategorije-users.component.html',
  styleUrls: ['./kategorije-users.component.scss'],
})
export class KategorijeUsersComponent implements OnInit {
  kategorije: Kategorija[] = [];
  sortColumn: keyof Kategorija = 'id'; // Početni stupac za sortiranje
  isAscending: boolean = true; // Početni smjer sortiranja

  constructor(private kategorijeService: KategorijeService) {}

  ngOnInit(): void {
    this.loadKategorije();
  }

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

  sort(column: keyof Kategorija): void {
    if (this.sortColumn === column) {
      this.isAscending = !this.isAscending; // Promijeni smjer ako je isti stupac
    } else {
      this.sortColumn = column; // Postavi novi stupac
      this.isAscending = true; // Zadano uzlazni smjer
    }
  }
}
