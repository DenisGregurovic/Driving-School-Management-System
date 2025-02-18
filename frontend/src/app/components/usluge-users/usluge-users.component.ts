import { Component, OnInit } from '@angular/core';
import { UslugeService } from '../../services/usluga.service';
import { Usluga } from '../../models/usluga.model';

@Component({
  selector: 'app-usluge-read-only',
  standalone: false,
  templateUrl: './usluge-users.component.html',
  styleUrls: ['./usluge-users.component.scss'],
})
export class UslugeReadOnlyComponent implements OnInit {
  usluge: Usluga[] = [];
  sortColumn: keyof Usluga = 'id'; // Početni stupac za sortiranje
  isAscending: boolean = true; // Početni smjer sortiranja

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

  sort(column: keyof Usluga): void {
    if (this.sortColumn === column) {
      this.isAscending = !this.isAscending; // Obrni smjer ako je isti stupac
    } else {
      this.sortColumn = column; // Postavi novi stupac
      this.isAscending = true; // Resetiraj na uzlazni smjer
    }
  }
}
