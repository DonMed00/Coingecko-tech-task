import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoinData, SearchData } from '../../../../models/CoinData';
import { CoinDetails } from '../../../../models/CoinDetails';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  private apiUrl = environment.apiURL;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'x-cg-demo-api-key': this.apiKey,
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
          this.handleError('getCoinsList', error);
          throw error;
        })
      );
  }

  search(query: string) {
    const params = new HttpParams().set('query', query);
    const options = this.getDefaultOptions(params);

    return this.http.get<SearchData>(`${this.apiUrl}/search`, options).pipe(
      catchError((error) => {
        this.handleError('search', error);
        throw error;
      })
    );
  }

  getCoinById(id: string): Observable<CoinDetails> {
    const options = this.getDefaultOptions(new HttpParams());

    return this.http
      .get<CoinDetails>(`${this.apiUrl}/coins/${id}`, options)
      .pipe(
        catchError((error) => {
          this.handleError('getCoinById', error);
          throw error;
        })
      );
  }

  private handleError(methodName: string, error: any): void {
    console.error(`Error in ${methodName}:`, error);
    alert('An error has ocurried');
  }
}
