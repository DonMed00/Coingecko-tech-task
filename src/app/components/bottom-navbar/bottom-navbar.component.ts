import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss',
})
export class BottomNavbarComponent {}
