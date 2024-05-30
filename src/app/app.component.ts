import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './core/services/language/language.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, BottomNavbarComponent, TranslateModule],
})
export class AppComponent {
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.initializeLanguage();
  }
}
