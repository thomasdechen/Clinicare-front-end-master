import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from  '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    NgxMaskDirective,
    NgxMaskPipe,
    provideNgxMask(), provideAnimationsAsync(),
    MatNativeDateModule,
    BrowserAnimationsModule,
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
};
