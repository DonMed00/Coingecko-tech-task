import { Component } from '@angular/core';
import { CoinDataSearch } from '../../../models/CoinData';
import { FormsModule } from '@angular/forms';
import { CoinGeckoService } from '../../core/services/coingecko/coingecko.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText: string = '';
  coins: CoinDataSearch[] = [];

  constructor(private coingeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.coingeckoService.coinsSearch$.subscribe((dataSearch) => {
      this.coins = dataSearch;
    });
  }

  search(): void {
    this.coingeckoService.search(this.searchText);
  }
}
