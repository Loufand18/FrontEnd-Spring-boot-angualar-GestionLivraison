import { Component, OnInit } from '@angular/core';
import { Trajet } from 'src/app/modeles/Trajet';
import { SerciceLivreurService } from 'src/app/Services/sercice-livreur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Livreur_trajet } from 'src/app/modeles/Livreur_trajet';
import { Livreur} from 'src/app/modeles/Livreur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css']
})
export class TrajetComponent implements OnInit {

  constructor(public api:SerciceLivreurService,public router:Router) { }
  idtrajet=null;
  livreur:Livreur[];
  nom=''
  idlivreur=null;
  message="";
  trajet: Trajet[];
  rv:Trajet[];
  ajoutrajet={
    id:Date.now(),
    source:"",
    destination:"",
    livreur:null,
  };

  Cancel(){
    this.ajoutrajet.source=""
    this.ajoutrajet.destination=""
    this.idlivreur=null
    this.idtrajet=null

  }

  AjouterTrajet(){
   this.api.AjoutTrajet(this.ajoutrajet).subscribe((data:Trajet) => {
      this.getTrajets();
      console.log(this.ajoutrajet)
      alert("Enregistrement reussi!")
      this.ajoutrajet.source=""
      this.ajoutrajet.destination=""
    },
    (error:HttpErrorResponse)=>{
             alert(error.message)
    }
     );


  }
  getTrajets(){
    this.api.getTrajet().subscribe((data:Trajet[]) => {
              this.trajet=data;


              console.log(this.trajet)


    },
    (error:HttpErrorResponse)=>{
             alert(error.message)
    }
     );
  }

  Attribuer(){

    const formData = new  FormData();


formData.append('idLivreur',this.idlivreur);
formData.append('idTrajet',this.idtrajet.toString());


  this.api.Attribuer(formData ).subscribe((data) => {
    this.message = 'Enregisgritement reussi';
        alert(this.message)
        this.Cancel()
        this.getLivreurs()



  },
  (error:HttpErrorResponse)=>{
    this.message = 'Enregistrement non reussi';
    alert(this.message)
    alert(error.message)
  }
   );

}

  Valider(){

       const formData = new  FormData();


   formData.append('idLivreur',this.idlivreur);
   formData.append('idTrajet',this.idtrajet.toString());


     this.api.AttribuerTrajetLivreur(formData ).subscribe((data:Livreur) => {
       this.message = 'Enregisgritement reussi';
           alert(this.message)
           this.getLivreurs()
           console.log(data.trajet[0].destination)



     },
     (error:HttpErrorResponse)=>{
       this.message = 'Enregistrement non reussi';
       alert(this.message)
       alert(error.message)
     }
      );

   }

   logout(){
    localStorage.removeItem('admin')
    this.router.navigate(["/login-admin"]);
  }

  supprimer(id:number){
    this.api.deleteTrajetById(id).subscribe((data) => {
      this.getTrajets();
      this.getLivreurs()

  },
  (error:HttpErrorResponse)=>{
     alert(error.message)

  }
  );

  }
  supprimerLivreur(id:number){
    this.api.deleteLivreurById(id).subscribe((data) => {
      this.getTrajets();
      this.getLivreurs()

  },
  (error:HttpErrorResponse)=>{
     alert(error.message)

  }
  );

  }

  getLivreurs(){
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
  }

    ngOnInit(): void {
      this.nom=localStorage.getItem('admin');
      if(this.nom==null){
        this.router.navigate(["/login-admin"]);


    }
    else{
      this.getTrajets();
      this.getLivreurs();
    }


  }

}
