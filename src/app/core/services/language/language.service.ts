import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  initializeLanguage() {
    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.setDefaultLang(browserLang);
    this.translate.use(browserLang);
  }
}
