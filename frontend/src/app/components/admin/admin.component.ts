import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Korisnik } from '../../models/korisnik.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activeUser: Korisnik | null = null;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.activeUser = this.authService.getActiveUser();
    this.isAdmin = this.activeUser?.razina_prava === 'admin';

    if (!this.isAdmin) {
      this.router.navigate(['/']);
    }
  }
}
