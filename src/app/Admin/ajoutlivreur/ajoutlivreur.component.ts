import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SerciceLivreurService} from '../../Services/sercice-livreur.service';
import { Livreur } from "../../modeles/Livreur";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutlivreur',
  templateUrl: './ajoutlivreur.component.html',
  styleUrls: ['./ajoutlivreur.component.css']
})
export class AjoutlivreurComponent implements OnInit {

  constructor( public uploadService:SerciceLivreurService,public fb: FormBuilder,private httpClient: HttpClient,public router:Router) {

   }

   livreur: Livreur[];
     nom=''
     selectedFile: File;
     retrievedImage: any;
     base64Data: any;
     retrieveResonse: any;
     message: string;
     imageName: any;
   rvgene={
    id:Date.now(),
    nom:"",
    prenom:"",
    adresse:"",
    numTel:"",
    email:"",
    moyen_transport:"",
    photo:"",
    type:"",
    picByte:null
  };
  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];

 }

 Cancel(){
  this.rvgene.nom="",
  this.rvgene.prenom="",
  this.rvgene.adresse="",
  this.rvgene.numTel="",
  this.rvgene.email="",
  this.rvgene.moyen_transport="",
  this.rvgene.photo="",
  this.rvgene.type="",
  this.rvgene.picByte=null
 }

  onSubmit() {}

  Valider2(){

      console.log(this.rvgene)
      console.log(this.selectedFile)
      console.log(this.selectedFile.name)
      const formData = new  FormData();
 // const article = this.rvgene

  formData.append('imageFile',this.selectedFile, this.selectedFile.name);
  formData.append('nom',this.rvgene.nom);
  formData.append('prenom',this.rvgene.prenom);
  formData.append('numTel',this.rvgene.numTel);
  formData.append('adresse',this.rvgene.adresse);
  formData.append('email',this.rvgene.email);
  formData.append('moyen_transport',this.rvgene.moyen_transport);

  this.httpClient.post('http://localhost:8081/api/sonuna', formData , { observe: 'response' })

      .subscribe((response) => {

        if (response.status === 200) {

          this.message = 'Image uploaded successfully';
          alert(this.message)

        } else {
          this.message = 'Image not uploaded successfully';
          alert(this.message)

        }

      }

      );



  }

  Valider(){
   console.log(this.rvgene)
      console.log(this.selectedFile)
      console.log(this.selectedFile.name)
      const formData = new  FormData();

  formData.append('imageFile',this.selectedFile, this.selectedFile.name);
  formData.append('nom',this.rvgene.nom);
  formData.append('prenom',this.rvgene.prenom);
  formData.append('numTel',this.rvgene.numTel);
  formData.append('adresse',this.rvgene.adresse);
  formData.append('email',this.rvgene.email);
  formData.append('moyen_transport',this.rvgene.moyen_transport);

    this.uploadService.AjouterLivreur(formData ).subscribe((data:Livreur) => {
      console.log(this.rvgene)
      this.message = 'Enregisgritement reussi';
          alert(this.message)
          this.Cancel()

    },
    (error:HttpErrorResponse)=>{
      this.message = 'Enregistrement non reussi';
      alert(this.message)
      alert(error.message)
      this.Cancel()
    }
     );

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

}

}

