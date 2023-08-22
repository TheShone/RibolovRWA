import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RibolovnaMestaComponent } from './ribolovna-mesta/ribolovna-mesta.component';
import { RibolovnoMestoComponent } from './ribolovno-mesto/ribolovno-mesto.component';
import { MojaRibolovnaMestaComponent } from './moja-ribolovna-mesta/moja-ribolovna-mesta.component';
import { MojeRibolovnoMestoComponent } from './moje-ribolovno-mesto/moje-ribolovno-mesto.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '' , component: HomeComponent},
  { path: 'ribolovnaMesta', component:RibolovnaMestaComponent},
  { path: 'ribolovnoMesto/:id' , component:RibolovnoMestoComponent},
  { path: 'mojaRibolovnaMesta', component:MojaRibolovnaMestaComponent},
  { path: 'mojeRibolovnoMesto/:id' , component:MojeRibolovnoMestoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
