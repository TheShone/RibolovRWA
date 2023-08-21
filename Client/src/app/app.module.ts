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
    RatingComponent
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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot({user:reducers,ribMesta:reducers2,ribMesto:reducers3, komentari:reducers4}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects,RibolovnaMestaEffects,RibolovnoMestoEffects,KomentariEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
