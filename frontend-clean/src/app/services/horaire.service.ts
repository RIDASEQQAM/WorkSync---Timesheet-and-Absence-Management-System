import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horaire } from '../models/horaire.model';
import { FeuilleDeTemps } from '../models/feuille-de-temps.model';
import { ApiResponse, FeuilleUpdateResponse } from '../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class HoraireService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api/horaires';

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]); // URL de l'API backend

    constructor() { }

    // Récupérer les horaires mensuels
    getHorairesMensuels(): Observable<Horaire[]> {
        return this.http.get<Horaire[]>(`${this.apiUrl}/mensuel`);
    }

    // Récupérer la feuille actuelle (corrigé)
    getFeuille(): Observable<FeuilleDeTemps> {
        return this.http.get<FeuilleDeTemps>('http://localhost:8080/api/feuilles/actuelle'); // adapte l'URL à ton backend
    }

    // Sauvegarder un brouillon d'horaires
    saveDraft(horaires: Horaire[]): Observable<ApiResponse<Horaire[]>> {
        return this.http.post<ApiResponse<Horaire[]>>(`${this.apiUrl}/save-draft`, horaires);
    }

    // Exporter les horaires en PDF
    exportPDF(): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/export-pdf`, { responseType: 'blob' });
    }

    updateFeuilleDraft(id: number, feuille: FeuilleDeTemps): Observable<ApiResponse<FeuilleUpdateResponse>> {
        return this.http.put<ApiResponse<FeuilleUpdateResponse>>(`${this.apiUrl}/update-draft/${id}`, feuille);
    }

    submitFeuille(id: number): Observable<ApiResponse<FeuilleUpdateResponse>> {
        return this.http.put<ApiResponse<FeuilleUpdateResponse>>(`http://localhost:8080/api/feuilles/submit/${id}`, {});
    }

    validerFeuille(id: number): Observable<ApiResponse<FeuilleUpdateResponse>> {
        return this.http.post<ApiResponse<FeuilleUpdateResponse>>(`http://localhost:8080/api/feuilles/${id}/valider`, {});
    }

    rejeterFeuille(id: number, remarque: string): Observable<ApiResponse<FeuilleUpdateResponse>> {
        return this.http.post<ApiResponse<FeuilleUpdateResponse>>(`http://localhost:8080/api/feuilles/${id}/rejeter`, { remarque });
    }
}
