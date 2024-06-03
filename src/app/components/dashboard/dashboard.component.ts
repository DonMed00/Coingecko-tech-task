import { Component } from '@angular/core';
import { CoinGeckoService } from '../../core/services/coingecko/coingecko.service';
import { CoinData } from '../../../models/CoinData';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from '../search/search.component';
import { Subscription, map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, SearchComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  coinsList: CoinData[] = [];
  showList = true;
  private dashboardSubscription: Subscription | undefined;

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.getCoinList();
    this.coinGeckoService.coinsSearch$
      .pipe(map((data) => data.length > 0))
      .subscribe((showList) => {
        this.showList = !showList;
      });
  }
  getCoinList(): void {
    this.dashboardSubscription = this.coinGeckoService
      .getCoinsList()
      .subscribe((coins) => {
        this.coinsList = coins;
      });
  }

  getColor(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  ngOnDestroy(): void {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }
}
