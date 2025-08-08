import { Component, OnDestroy, inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Chemin corrigé
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Ajout du style
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  currentUrl!: string;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  shouldShowTimesheetLink(): boolean {
    return this.authService.isAuthenticated() || this.currentUrl === '/timesheet';
  }
}
