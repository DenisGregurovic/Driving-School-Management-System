import { Component, OnInit } from '@angular/core';
import { InstruktorService } from '../../services/instruktor.service';
import { Instruktor } from '../../models/instruktor.model';

@Component({
  selector: 'app-instruktori-read-only',
  standalone: false,
  templateUrl: './instruktori-users.component.html',
  styleUrls: ['./instruktori-users.component.scss'],
})
export class InstruktoriReadOnlyComponent implements OnInit {
  instruktori: Instruktor[] = [];
  sortColumn: string = 'korisnik.id'; // Početni stupac za sortiranje
  isAscending: boolean = true; // Početni smjer sortiranja

  constructor(private instruktorService: InstruktorService) {}

  ngOnInit(): void {
    this.loadInstruktori();
  }

  loadInstruktori(): void {
    this.instruktorService.getInstruktori().subscribe((data) => {
      this.instruktori = data;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.isAscending = !this.isAscending; // Obrni smjer ako je isti stupac
    } else {
      this.sortColumn = column; // Postavi novi stupac
      this.isAscending = true; // Resetiraj na uzlazni smjer
    }
  }
}
