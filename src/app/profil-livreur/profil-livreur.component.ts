import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livreur_trajet } from '../modeles/Livreur_trajet';
import { SerciceLivreurService } from '../Services/sercice-livreur.service';
import { Livreur } from '../modeles/Livreur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil-livreur',
  templateUrl: './profil-livreur.component.html',
  styleUrls: ['./profil-livreur.component.css']
})
export class ProfilLivreurComponent implements OnInit {

  constructor(private routeActive:ActivatedRoute,public api:SerciceLivreurService,private router:Router) { }
  tab:Livreur[];
  livreur1:Livreur_trajet[];
    id:any;
    nom=""
    livreur:Livreur;
    key: Livreur;
  getDetail(){
    this.api.getLivreur().subscribe((data:Livreur[]) => {
      this.tab=data;
          console.log(this.tab)
         var i;
      for ( i = 0; i <this.tab.length; i++){
        this.tab[i].picByte='data:image/jpeg;base64,' + this.tab[i].picByte;
      }

       console.log(this.tab)
      for ( i = 0; i <this.tab.length; i++){
        if(this.tab[i].id==this.id){
          this.key=this.tab[i];

        }

      }


      },
      (error:HttpErrorResponse)=>{
               alert(error.message)
      }
       );

      /*
       console.log(this.id)
       console.log(this.tab)

       console.log(this.key)



    console.log(this.key)*/

  }
  logout(){
    localStorage.removeItem('name')
    this.router.navigate(["login"]);
  }
   Connecter(){

    this.router.navigate(["login"]);
  }


  ngOnInit(): void {

    this.id= this.routeActive.snapshot.paramMap.get("id");
    console.log(this.routeActive.snapshot.paramMap.get("id"))
    this.getDetail();
    this.nom=localStorage.getItem('name');



}
}
