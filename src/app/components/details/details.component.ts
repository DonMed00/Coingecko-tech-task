import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinGeckoService } from '../../core/services/coingecko/coingecko.service';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CoinData } from '../../../models/CoinData';
import { CoinDetails } from '../../../models/CoinDetails';
import { LanguageService } from '../../core/services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  coinId: string = '';
  coinDetails: CoinDetails | undefined;
  faArrowLeft = faArrowLeft;
  currentLanguage: string = 'es';
  private coinDetailsSubscription: Subscription | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private coinGeckoService: CoinGeckoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.coinId = this.route.snapshot.paramMap.get('id') ?? '';
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.getCoinDetails();
  }
  getCoinDetails() {
    this.coinDetailsSubscription = this.coinGeckoService
      .getCoinById(this.coinId)
      .subscribe((details) => {
        this.coinDetails = details;
        this.isLoading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.coinDetailsSubscription) {
      this.coinDetailsSubscription.unsubscribe();
    }
  }
}
