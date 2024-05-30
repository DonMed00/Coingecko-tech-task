import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CoinData } from '../../../../models/CoinData';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCoinsList(): Observable<CoinData[]> {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
      params: {
        vs_currency: 'usd',
      },
    };

    return this.http.get<CoinData[]>(`${this.apiUrl}/coins/markets`, options);
  }
}
