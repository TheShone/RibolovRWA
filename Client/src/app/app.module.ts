import { reducers } from './store/reducers/user.reducers';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { RibolovnaMestaComponent } from './ribolovna-mesta/ribolovna-mesta.component';
import { RibolovnoMestoComponent } from './ribolovno-mesto/ribolovno-mesto.component';
import { RibolovnaMestaEffects } from './store/effects/ribMesta.effects';
import { reducers2 } from './store/reducers/ribMesta.reducers';
import { reducers3 } from './store/reducers/ribMesto.reducers';
import { RibolovnoMestoEffects } from './store/effects/ribMesto.effects';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import { RatingComponent } from './utilities/rating/rating.component'
import { DatePipe } from '@angular/common';
import { reducers4 } from './store/reducers/komentari.reducers';
import { KomentariEffects } from './store/effects/komentari.effects';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MojaRibolovnaMestaComponent } from './moja-ribolovna-mesta/moja-ribolovna-mesta.component';
import { MojaRibMestaEffects } from './store/effects/mojaRibMesta.effects';
import { reducers5 } from './store/reducers/mojaRibMesta.reducers';
import { MojeRibolovnoMestoComponent } from './moje-ribolovno-mesto/moje-ribolovno-mesto.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ProfilComponent } from './profil/profil.component'
import { reducers6 } from './store/reducers/profil.reducers';
import { ProfilEffects } from './store/effects/profile.effects';
import { FilterPipe } from './utilities/filter.pipe';
import { FilterPipePublisher } from './utilities/filterPublisher.pipe';
import { ResponsiveHeaderComponent } from './responsive-header/responsive-header.component';
import { UseriComponent } from './useri/useri.component';
import { UseriEffects } from './store/effects/useri.effects';
import { reducers7 } from './store/reducers/useri.reducers';
import { FilterUsers } from './utilities/filterUsers.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    RibolovnaMestaComponent,
    RibolovnoMestoComponent,
    RatingComponent,
    MojaRibolovnaMestaComponent,
    MojeRibolovnoMestoComponent,
    ProfilComponent,
    FilterPipe,
    FilterPipePublisher,
    ResponsiveHeaderComponent,
    UseriComponent,
    FilterUsers 
  ],
  providers: [DatePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgxPaginationModule,
    GoogleMapsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot({user:reducers,ribMesta:reducers2,ribMesto:reducers3, komentari:reducers4, mojaRibMesta:reducers5,
    profil:reducers6, useri:reducers7}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects,RibolovnaMestaEffects,RibolovnoMestoEffects,KomentariEffects,MojaRibMestaEffects
      ,ProfilEffects,UseriEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
