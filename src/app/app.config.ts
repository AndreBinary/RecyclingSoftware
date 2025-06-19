import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ColorPickerService } from 'ngx-color-picker';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    RouterOutlet,
    ColorPickerService,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,  
    AngularFireModule,
    importProvidersFrom(
      FlatpickrModule.forRoot(),
      NgbModule,
      ToastrService,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      OverlayscrollbarsModule,
      AngularFireModule.initializeApp(environment.firebase),
    )

  ],
};
