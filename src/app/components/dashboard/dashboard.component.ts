import { Component } from '@angular/core';
import { CoinGeckoService } from '../../core/services/coingecko/coingecko.service';
import { CoinData } from '../../../models/CoinData';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  coinsList: CoinData[] = [];

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.getCoinList();
  }

  getCoinList(): void {
    this.coinGeckoService.getCoinsList().subscribe((data) => {
      this.coinsList = data;
    });
  }

  getColor(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }
}
