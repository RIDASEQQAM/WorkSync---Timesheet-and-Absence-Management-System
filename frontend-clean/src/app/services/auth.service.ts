import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'APPROBATEUR' | 'EMPLOYE';
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiURL}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string; }, password: any): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => {
        this.handleAuthentication(response);
        this.redirectBasedOnRole(response.user.role);
      }),
      map(response => response.user),
      catchError(error => {
        console.error('Erreur de connexion :', error);
        return throwError(() => error);
      })
    );
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private redirectBasedOnRole(role: string): void {
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      alert("Accès refusé. Seul l'admin peut se connecter.");
      this.logout();
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  setAuthentication(value: boolean) {
    this.isAuthenticated$.next(value);
  }
}
