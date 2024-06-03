import { Component } from '@angular/core';
import { LanguageService } from '../../core/services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  private currentTheme: string = 'light';
  themeLabel: string = 'THEME_LABEL_LIGHT';

  constructor(private languageService: LanguageService) {
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
