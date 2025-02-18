import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { KategorijeComponent } from './components/kategorije/kategorije.component';
import { UslugeComponent } from './components/usluge/usluge.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { InstruktoriComponent } from './components/instruktori/instruktori.component';
import { RezervacijeComponent } from './components/rezervacije/rezervacije.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './components/Guard/admin.guard';
import { InstruktoriReadOnlyComponent } from './components/instruktori-users/instruktori-users.component';
import { UslugeReadOnlyComponent } from './components/usluge-users/usluge-users.component';
import { KategorijeUsersComponent } from './components/kategorije-users/kategorije-users.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'instruktori-users', component: InstruktoriReadOnlyComponent},
  {path: 'usluge-users', component: UslugeReadOnlyComponent},
  {path: 'kategorije-users', component: KategorijeUsersComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'kategorije', component: KategorijeComponent, canActivate: [AdminGuard] },
  { path: 'usluge', component: UslugeComponent, canActivate: [AdminGuard] },
  { path: 'korisnici', component: KorisniciComponent, canActivate: [AdminGuard] },
  { path: 'instruktori', component: InstruktoriComponent, canActivate: [AdminGuard] },
  { path: 'rezervacije', component: RezervacijeComponent, canActivate: [AdminGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
