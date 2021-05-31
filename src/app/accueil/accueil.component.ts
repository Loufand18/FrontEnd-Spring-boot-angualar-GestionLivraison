import { Component, OnInit, HostListener } from '@angular/core';
import { SerciceLivreurService } from '../Services/sercice-livreur.service';
import { Livreur } from '../modeles/Livreur';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Livreur_trajet } from '../modeles/Livreur_trajet';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewComponent } from '../view/view.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  constructor(
    public api: SerciceLivreurService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}
  vuecli = true;
  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';
  source: string;
  destination: string;
  titre = 'Les meilleurs Livreurs du mois';
  paragraphe =
    'Ces livreurs sont nos meilleurs du mois.Ils vont vous assurez une service de qualité';
  id;
  // livreur: Livreur[];
  livreur: Livreur[];
  prefere: any[];
  livreur1: Livreur[];
  //rv:Livreur[];
  tab: Livreur[];
  tab2: Livreur_trajet[];

  nom;
  getLivreurs() {
    this.api.getLivreur().subscribe(
      (data: Livreur[]) => {
        this.livreur = data;

        for (var i = 0; i < this.livreur.length; i++) {
          this.livreur[i].picByte =
            'data:image/jpeg;base64,' + this.livreur[i].picByte;
          //console.log(this.livreur[i].trajet[i].destination)
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  /* getLivreursOr(){
    this.api.getLivreur().subscribe((data:Livreur[]) => {
              this.livreur=data;

              for (var i = 0; i <this.livreur.length; i++){
                this.livreur[i].picByte='data:image/jpeg;base64,' + this.livreur[i].picByte;

              }
              console.log(this.livreur)

    },
    (error:HttpErrorResponse)=>{
             alert(error.message)
    }
     );
  }*/
  getMeilleursLivreurs(source, destination) {
    if (this.nom != null) {
      this.api.getLivreur().subscribe(
        (data: Livreur[]) => {
          this.tab = data;
          var j = 0;
          var i = 0;
          var verif = 0;
          console.log(this.tab);

          this.livreur.length = 0;
          for (i = 0; i < this.tab.length; i++) {
            this.tab[i].picByte =
              'data:image/jpeg;base64,' + this.tab[i].picByte;
          }
          for (i = 0; i < this.tab.length; i++) {
            for (var k = 0; k < this.tab[i].trajet.length; k++) {
              console.log(i, k);
              if (
                this.tab[i].trajet[k].destination == destination &&
                this.tab[i].trajet[k].source == source
              ) {
                console.log('c bon');
                if (this.livreur.indexOf(this.tab[i]) == -1) {
                  this.livreur[j] = this.tab[i];
                  j++;
                }
                verif = 1;
              }
            }
          }
          // this.tab2[j]=this.tab[i]

          if (verif == 1) {
            this.titre = 'Voici les livreurs trouves ';
            this.paragraphe =
              'Concernant votre trajet ' +
              this.source +
              '-' +
              this.destination +
              " ,il n'y a que ces livreurs qui sont disponibles";
          } else {
            this.titre = 'OUPS !';
            this.paragraphe =
              "Desole! Nous n'avons pas encore des livreurs pour ce trajet " +
              this.source +
              '-' +
              this.destination;
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.toastr.warning("vous n'etes pas connecté ");
    }
  }
  valider(info: number) {
    if (this.nom != null) {
      this.id = info;
      this.router.navigate(['profil-livreur', this.id]);
    } else {
      this.toastr.warning("vous n'etes pas connecté ");
    }
  }
  back() {
    //this.router.navigate(["login"]);
    window.location.reload();
  }
  logout() {
    localStorage.removeItem('name');
    this.router.navigate(['login']);
  }
  Connecter() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.getLivreurs();
    this.nom = localStorage.getItem('name');
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }
}
