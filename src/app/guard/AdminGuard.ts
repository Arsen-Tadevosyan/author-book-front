import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
