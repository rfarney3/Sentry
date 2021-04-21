import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

Sentry.init({
  dsn:
    'https://9badecaae1634b3d80c30f52bbbbaa0a@o566014.ingest.sentry.io/5729170',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  tracesSampleRate: 1.0,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
