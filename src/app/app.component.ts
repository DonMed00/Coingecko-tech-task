import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './core/services/language/language.service';
import { NavbarComponent } from './components/navbar/navbar.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TranslateModule, NavbarComponent],
})
export class AppComponent {
  constructor(private languageService: LanguageService) {}
  private currentTheme: string = 'light';
  themeLabel: string = 'THEME_LABEL_LIGHT';

  ngOnInit() {
    this.languageService.initializeLanguage();
    this.updateThemeLabel();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = this.currentTheme + '-theme';
    this.updateThemeLabel();
  }

  updateThemeLabel(): void {
    const key =
      this.currentTheme === 'dark' ? 'THEME_LABEL_LIGHT' : 'THEME_LABEL_DARK';
    this.languageService.get(key).subscribe((res: string) => {
      this.themeLabel = res;
    });
  }
}
