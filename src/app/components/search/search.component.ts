import { Component } from '@angular/core';
import { CoinDataSearch } from '../../../models/CoinData';
import { CoinGeckoService } from '../../core/services/coingecko/coingecko.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchText: string = '';
  coins: CoinDataSearch[] = [];
  private searchSubscription: Subscription | undefined;

  constructor(private coingeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.searchSubscription = this.coingeckoService.coinsSearch$.subscribe(
      (dataSearch) => {
        this.coins = dataSearch;
      }
    );
  }

  async search(): Promise<void> {
    if (!this.searchText.trim()) {
      this.coins = [];
      return;
    }

    try {
      await this.coingeckoService.search(this.searchText);
    } catch (error) {
      console.error('Error searching coins:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
