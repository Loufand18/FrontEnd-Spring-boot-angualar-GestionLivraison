import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilLivreurComponent } from './profil-livreur/profil-livreur.component';
import { HomeComponent } from './Admin/home/home.component';
import { AjoutlivreurComponent } from './Admin/ajoutlivreur/ajoutlivreur.component';
import { ListeLivreurComponent } from './Admin/liste-livreur/liste-livreur.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { TrajetComponent } from './Admin/trajet/trajet.component';
import { NoterLivreurComponent } from './Admin/noter-livreur/noter-livreur.component';
import { ModifierLivreurComponent } from './Admin/modifier-livreur/modifier-livreur.component';
import { ViewComponent } from './view/view.component';
import { RegisterLoginComponent } from './Admin/register-login/register-login.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:'',component:AccueilComponent},
  {path:'register',component:RegisterComponent},
  {path:'accueil',component:AccueilComponent},
  {path:'login',component:LoginComponent},
  {path:'modifier-livreur',component:ModifierLivreurComponent},
  {path:'home',component: HomeComponent},
  {path:'ajoutlivreur',component:AjoutlivreurComponent},
  {path:'login-admin',component:LoginAdminComponent},
  {path:'liste-livreur',component:ListeLivreurComponent},
  {path:'view', component:ViewComponent},
  {path:'register-login',component: RegisterLoginComponent},
  {path:'trajet',component:TrajetComponent},
  {path:"profil-livreur/:id",component:ProfilLivreurComponent},
  {path:"about",component:AboutComponent},
  {path:"noter-livreur",component:NoterLivreurComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
