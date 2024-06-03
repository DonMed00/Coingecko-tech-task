import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CoinData,
  CoinDataSearch,
  SearchData,
} from '../../../../models/CoinData';
import { CoinDetails } from '../../../../models/CoinDetails';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  private coinsSearchSubject: BehaviorSubject<CoinDataSearch[]> =
    new BehaviorSubject<CoinDataSearch[]>([]);
  coinsSearch$: Observable<CoinDataSearch[]> =
    this.coinsSearchSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      // 'x-cg-demo-api-key': this.apiKey,
    });
  }

  private getDefaultOptions(params: HttpParams): {
    headers: HttpHeaders;
    params: HttpParams;
  } {
    return {
      headers: this.getDefaultHeaders(),
      params: params,
    };
  }

  getCoinsList() {
    const params = new HttpParams().set('vs_currency', 'usd');
    const options = this.getDefaultOptions(params);

    return this.http
      .get<CoinData[]>(`${this.apiUrl}/coins/markets`, options)
      .pipe(
        catchError((error) => {
          console.error('Error fetching coins list:', error);
          throw error;
        })
      );
  }

  search(query: string): void {
    const params = new HttpParams().set('query', query);
    const options = this.getDefaultOptions(params);

    this.http
      .get<SearchData>(`${this.apiUrl}/search`, options)
      .pipe(
        catchError((error) => {
          console.error('Error searching coins:', error);
          throw error;
        })
      )
      .subscribe((data) => this.coinsSearchSubject.next(data.coins));
  }

  getCoinById(id: string): Observable<CoinDetails> {
    const options = this.getDefaultOptions(new HttpParams());

    return this.http
      .get<CoinDetails>(`${this.apiUrl}/coins/${id}`, options)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching coin ${id} details:`, error);
          throw error;
        })
      );
  }
}
