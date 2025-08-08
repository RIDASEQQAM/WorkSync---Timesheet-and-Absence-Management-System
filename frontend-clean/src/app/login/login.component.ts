import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',  
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  errorMessage = '';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Supposons que le backend renvoie un rôle : 'ADMIN' ou 'EMPLOYE'
        const userRole = response.role;

        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin']);  // route vers la page admin
        } else {
          this.errorMessage = 'Accès refusé. Seul l’administrateur peut se connecter.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Identifiants incorrects ou erreur serveur.';
      }
    });
  }
}
