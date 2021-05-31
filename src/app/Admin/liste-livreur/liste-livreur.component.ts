import { Component, OnInit } from '@angular/core';
import { SerciceLivreurService} from '../../Services/sercice-livreur.service';
import { Livreur } from "../../modeles/Livreur";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModifierLivreurComponent } from '../modifier-livreur/modifier-livreur.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-livreur',
  templateUrl: './liste-livreur.component.html',
  styleUrls: ['./liste-livreur.component.css']
})
export class ListeLivreurComponent implements OnInit {

  constructor(public api:SerciceLivreurService,private modalService: NgbModal,public router:Router) { }
  vuecli=true;
  nom=""
  upLivreur:Livreur
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
 /* supprimer1(id:number){
    this.rendezVous=this.rendezVous.filter((rv)=>{
      return rv.id!=id;



  }

    );
}*/
  supprimer(id:number){
    this.api.deleteLivreurById(id).subscribe((data) => {
      this.getLivreurs();

  },
  (error:HttpErrorResponse)=>{
     alert(error.message)
     console.log(id)
  }
  );

  }

  edit(id:number,livreur:Livreur){
    const modalRef = this.modalService.open(ModifierLivreurComponent);

    modalRef.componentInstance.upLivreur=livreur;
    modalRef.result.then(result => {
      //do something with result
      console.log(result)
    } )

   // this.router.navigate(["/modifier-livreur",id]);

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
