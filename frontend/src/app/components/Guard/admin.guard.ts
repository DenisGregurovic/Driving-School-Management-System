import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getActiveUser(); // Get active user from AuthService

    // Check if user exists and is an admin
    if (user && user.razina_prava === 'admin') {
      return true; // Allow access
    }

    // Redirect to login or home if not authorized
    this.router.navigate(['/login']);
    return false;
  }
}
