import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import {
  CoinData,
  CoinDataSearch,
  SearchData,
} from '../../../../models/CoinData';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  private coinsSubject: BehaviorSubject<CoinData[]> = new BehaviorSubject<
    CoinData[]
  >([]);
  coins$: Observable<CoinData[]> = this.coinsSubject.asObservable();

  private coinsSearchSubject: BehaviorSubject<CoinDataSearch[]> =
    new BehaviorSubject<CoinDataSearch[]>([]);
  coinsSearch$: Observable<CoinDataSearch[]> =
    this.coinsSearchSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCoinsList();
  }

  getCoinsList() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
      params: {
        vs_currency: 'usd',
      },
    };
    this.http
      .get<CoinData[]>(`${this.apiUrl}/coins/markets`, options)
      .pipe(tap((coins) => this.coinsSubject.next(coins)))
      .subscribe();
  }

  search(query: string) {
    const params = new HttpParams().set('query', query);
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
      params: params,
    };
    this.http
      .get<SearchData>(`${this.apiUrl}/search`, options)
      .pipe(tap((coins) => this.coinsSearchSubject.next(coins.coins)))
      .subscribe();
  }
}
