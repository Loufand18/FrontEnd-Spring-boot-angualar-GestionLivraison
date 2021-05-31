import { Component, OnInit } from '@angular/core';
import { SerciceLivreurService } from 'src/app/Services/sercice-livreur.service';
import { Livreur } from 'src/app/modeles/Livreur';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noter-livreur',
  templateUrl: './noter-livreur.component.html',
  styleUrls: ['./noter-livreur.component.css']
})
export class NoterLivreurComponent implements OnInit {

  constructor(public api:SerciceLivreurService,public router:Router) { }
  idlivreur=null;
  note=null;
  message=""

nom=''

  livreur: Livreur[];
  rv:Livreur[];
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


  Valider(){

    const formData = new  FormData();


formData.append('idlivreur',this.idlivreur);
formData.append('note',this.note);


  this.api.NoterLivreur(formData ).subscribe((data:Livreur) => {
    this.message = 'Notation reussie';
        alert(this.message)
        this.getLivreurs();

  },
  (error:HttpErrorResponse)=>{
    this.message = 'Enregistrement non reussi';
    alert(this.message)
    alert(error.message)
  }
   );

}
Cancel(){
  this.idlivreur=""
  this.note=""

}
logout(){
  localStorage.removeItem('admin')
  this.router.navigate(["/login-admin"]);
}



  ngOnInit(): void {
    this.nom=localStorage.getItem('admin');
    if(this.nom==null){
      this.router.navigate(["/login-admin"]);


  }
  else{
    this.getLivreurs();
  }

  }


}
