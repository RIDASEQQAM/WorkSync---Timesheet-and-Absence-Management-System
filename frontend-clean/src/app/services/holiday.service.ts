import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private http = inject(HttpClient);

  private apiUrl = 'https://date.nager.at/api/v3/publicholidays';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() { }

  getHolidays(year: number, countryCode: string): Observable<Date[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${year}/${countryCode}`).pipe(
      map(holidays => holidays.map(h => new Date(h.date)))
    );
  }
}