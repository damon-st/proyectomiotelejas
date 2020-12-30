import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule, NgControl} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './componets/headers/headers.component';
import { FootersComponent } from './componets/footers/footers.component';
import { AboutusComponent } from './componets/aboutus/aboutus.component';
import { TalvestodoaquiComponent } from './componets/talvestodoaqui/talvestodoaqui.component';
import { ComprarunoComponent } from './componets/compraruno/compraruno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-modue';
import { NgxCaptchaModule } from 'ngx-captcha';


/*Firebase */
import {AngularFirestoreModule} from '@angular/fire/firestore';
// import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ServicemainService } from './services/servicemain.service';
import { AuthService } from './services/auth.service';
import { CrearcuentaComponent } from './componets/crearcuenta/crearcuenta.component';
import { DialogorecargasComponent } from './componets/dialogorecargas/dialogorecargas.component';
import { NgxStripeModule } from 'ngx-stripe';

import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FootersComponent,
    AboutusComponent,
    TalvestodoaquiComponent,
    ComprarunoComponent,
    CrearcuentaComponent,
    DialogorecargasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51HnwiaJQJHJfw1vZdCxtStUI94KY6ErHfZYOJUrXp2uxYTr9BZU1ddyLfxEcz0VRPio5FLfhsinlEcgA4wDPF39y00BCd0AxiI'),
    NgxCaptchaModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide: BUCKET, useValue: 'gs://telejaswebapp.appspot.com'}, ServicemainService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
