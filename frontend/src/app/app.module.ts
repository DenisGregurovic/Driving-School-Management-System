import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { UslugeComponent } from './components/usluge/usluge.component';
import { KategorijeComponent } from './components/kategorije/kategorije.component';
import { RezervacijeComponent } from './components/rezervacije/rezervacije.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InstruktoriComponent } from './components/instruktori/instruktori.component';
import { InstruktoriReadOnlyComponent } from './components/instruktori-users/instruktori-users.component';
import { UslugeReadOnlyComponent } from './components/usluge-users/usluge-users.component';
import { KategorijeUsersComponent } from './components/kategorije-users/kategorije-users.component';
import { SortPipe } from './pipes/sort.pipe';
import { InstPipe } from './pipes/inst.pipe';
import { UslugePipe } from './pipes/usluge.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UslugeComponent,
    KategorijeComponent,
    RezervacijeComponent,
    KorisniciComponent,
    ProfilComponent,
    NavbarComponent,
    InstruktoriComponent,
    InstruktoriReadOnlyComponent,
    UslugeReadOnlyComponent,
    KategorijeUsersComponent,
    SortPipe,
    InstPipe,
    UslugePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
