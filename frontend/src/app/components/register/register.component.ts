import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  korisnik: any = {
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    razina_prava: 'korisnik',
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.korisnik).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Preusmjeravanje na login
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Greška pri registraciji.';
      },
    });
  }
}
