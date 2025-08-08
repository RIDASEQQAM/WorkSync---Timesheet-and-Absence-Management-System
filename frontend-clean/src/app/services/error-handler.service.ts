import { Injectable } from '@angular/core';
import { ApiError } from '../models/api-error.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor() { }

    handleError(error: Error | HttpErrorResponse): ApiError {
        console.error('Erreur détectée :', error);
        
        if (error instanceof HttpErrorResponse) {
            return {
                message: error.error?.message || error.message,
                status: error.status,
                error: error.error?.error || error.statusText,
                path: error.url || undefined
            };
        }
        
        return {
            message: error.message,
            error: error.name
        };
    }ectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor() { }

    handleError(error: any): void {
        console.error('Erreur détectée :', error);
        // Tu peux ajouter d’autres traitements ici si besoin
    }
}
