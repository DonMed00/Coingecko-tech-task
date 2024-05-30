import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent, HttpLoaderFactory } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

const appConfigWithTranslate = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'es',
      })
    ),
  ],
};

bootstrapApplication(AppComponent, appConfigWithTranslate).catch((err) =>
  console.error(err)
);
