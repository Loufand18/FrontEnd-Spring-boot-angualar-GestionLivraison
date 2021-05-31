import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { ProfilLivreurComponent } from './profil-livreur/profil-livreur.component';
import { View2Component } from './view2/view2.component';
import { HomeComponent } from './Admin/home/home.component';
import { AjoutlivreurComponent } from './Admin/ajoutlivreur/ajoutlivreur.component';
import { ListeLivreurComponent } from './Admin/liste-livreur/liste-livreur.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { SerciceLivreurService } from './Services/sercice-livreur.service';
import { TrajetComponent } from './Admin/trajet/trajet.component';
import { NoterLivreurComponent } from './Admin/noter-livreur/noter-livreur.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModifierLivreurComponent } from './Admin/modifier-livreur/modifier-livreur.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterLoginComponent } from './Admin/register-login/register-login.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AccueilComponent,
    ViewComponent,
    ProfilLivreurComponent,
    View2Component,
    HomeComponent,
    AjoutlivreurComponent,
    ListeLivreurComponent,
    LoginAdminComponent,
    TrajetComponent,
    NoterLivreurComponent,
    ModifierLivreurComponent,
    RegisterLoginComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    NgbModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    SerciceLivreurService
  ],
  bootstrap: [AppComponent],
  exports: [ ModifierLivreurComponent,ViewComponent]
})
export class AppModule { }
