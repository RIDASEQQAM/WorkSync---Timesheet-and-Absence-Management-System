import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface UserRegistration {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    address?: string; // Optionnel
}

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'http://localhost:8090/auth/register'; // Note: changé pour correspondre à votre endpoint Spring

    constructor(private http: HttpClient) { }

    register(userData: UserRegistration): Observable<any> {
        return this.http.post(this.apiUrl, userData).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Une erreur inconnue est survenue';
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur: ${error.error.message}`;
        } else {
            // Erreur côté serveur
            errorMessage = error.error?.message || error.statusText;
        }
        return throwError(() => new Error(errorMessage));
    }
}