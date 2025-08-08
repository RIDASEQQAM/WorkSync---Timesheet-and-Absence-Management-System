import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class ApprobateurService {
    private http = inject(HttpClient);


    private apiUrl = 'http://localhost:8080/api/approbateurs';

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() { }

    getApprobateurs(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}
