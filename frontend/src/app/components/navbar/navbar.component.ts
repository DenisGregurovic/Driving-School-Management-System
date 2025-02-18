import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Putanja prema AuthService
import { Subscription } from 'rxjs';
import { Korisnik } from '../../models/korisnik.model'; // Model korisnika

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  authenticated = false; // Status prijave
  activeUser: Korisnik | null = null; // Aktivni korisnik
  authChangeSubscription: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Postavi početni status autentifikacije
    this.authenticated = !!this.authService.getActiveUser();
    this.activeUser = this.authService.getActiveUser();

    // Prati promjene u autentifikaciji
    this.authChangeSubscription = this.authService.authChange.subscribe(() => {
      this.authenticated = !!this.authService.getActiveUser();
      this.activeUser = this.authService.getActiveUser();
    });
  }

  getClass(path: string): string {
    return this.router.url === path ? 'active' : '';
  }

  logout(): void {
    this.authService.clearToken();
    this.authService.clearActiveUser();
    this.router.navigate(['/login']);
  }
  

  ngOnDestroy(): void {
    if (this.authChangeSubscription) {
      this.authChangeSubscription.unsubscribe();
    }
  }
}
