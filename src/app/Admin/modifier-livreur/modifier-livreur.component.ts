import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Livreur } from 'src/app/modeles/Livreur';
import { SerciceLivreurService } from 'src/app/Services/sercice-livreur.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-modifier-livreur',
  templateUrl: './modifier-livreur.component.html',
  styleUrls: ['./modifier-livreur.component.css']
})
export class ModifierLivreurComponent implements OnInit {
  @Input()
  magasin!:Livreur;
  rvgene!:Livreur;

  existant!:boolean;

  selectedFile: any;
  encharge=false;
  charger=false;
  creation = false;
  message="";
  magasinForm: any;
  errorMessage: any;

  constructor(
    public uploadService:SerciceLivreurService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {

    if(this.magasin!=null){
      this.existant=true;


    } else {
      this.existant=false;

      this.rvgene={
        id:Date.now(),
        nom:"",
        prenom:"",
        adresse:"",
        numTel:"",
        email:"",
        moyen_transport:"",
        photo:"",
        type:"",
        picByte:null,
        note:"",
        trajet:null
      };


      this.magasin = {
        id:0,
        prenom: '',
        nom: '',
        numTel: '',
        adresse: '',
        email: '',
        note:'',
        moyen_transport:'',
        photo:"",
        type:"",
        picByte:null,
        trajet:null
      };

    }
    this.initForm();
    if (this.magasin.picByte != null) this.charger=true;
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];

}
get email() {
  return this.magasinForm.get('email');
}

get adresse() {
  return this.magasinForm.get('adresse');
}

get prenom() {
  return this.magasinForm.get('prenom');
}

get nom() {
  return this.magasinForm.get('nom');
}

get moyen_transport() {
  return this.magasinForm.get('moyen_transport');
}
get numTel() {
  return this.magasinForm.get('numTel');
}

  initForm() {
    this.magasinForm = this.formBuilder.group(
      {
        id: [
          this.magasin.id,
          [Validators.required]
        ],
        prenom: [
          this.magasin.prenom,
          [Validators.required]
        ],
        nom: [
          this.magasin.nom,
          [Validators.required]
        ],
        email: [
          this.magasin.email,
          [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
        ],
        numTel: [
          this.magasin.numTel,
          [
            Validators.required,
            Validators.pattern('^(70|75|76|77|78|33)?[0-9]{9}$'),
          ],
        ],
        adresse: [
          this.magasin.adresse,
          [Validators.required, Validators.pattern(/[a-zA-Z0-9]{4,}$/)],
        ],
        moyen_transport: [
          this.magasin.moyen_transport,
          [Validators.required, Validators.pattern(/[a-zA-Z]{4,}$/)],
        ]
      }
    );
  }

  Valider(){
    console.log(this.magasin)
       console.log(this.selectedFile)
       console.log(this.selectedFile.name)
       const formData = new  FormData();
      formData.append('idlivreur',this.magasin.id.toString());
   formData.append('imageFile',this.selectedFile, this.selectedFile.name);
   formData.append('nom',this.magasin.nom);
   formData.append('prenom',this.magasin.prenom);
   formData.append('numTel',this.magasin.numTel);
   formData.append('adresse',this.magasin.adresse);
   formData.append('email',this.magasin.email);
   formData.append('moyen_transport',this.magasin.moyen_transport);

     this.uploadService.updateLivreur(formData ).subscribe((data:Livreur) => {
       console.log(this.rvgene)
       this.message = 'Mise a jour reussie';
           alert(this.message)


    this.activeModal.close();
    location.reload();
    //this.router.navigate(["liste-livreur"]);



     },
     (error:HttpErrorResponse)=>{
       this.message = 'Mise a jour non reussie';
       alert(this.message)
       //this.router.navigate(["liste-livreur"]);

     }
      );

   }
 /* ajouter() {
  if(!this.existant){
    this.fireUtils.createNewMagasin(this.magasin).then(
      () => {
        this.activeModal.close();
        this.router.navigate(['/']);

      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }
  else {
    this.fireUtils.updateMagasin(this.magasin);
    this.activeModal.close();
  }

  }

  imageselect(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(file);
    });
    reader.readAsDataURL(file);
  }

  changer(){
    if (this.magasin.nomimg != null) {
      this.fireUtils.delImage(this.magasin.nomimg);
      this.magasin.nomimg=undefined;
      this.magasin.image=undefined;
    }
    this.charger=false;
  }

  upload() {
    let upim=this.fireUtils.uploadImage(this.selectedFile);
    this.encharge=true;
    upim.on(
      firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log('ok');
      },
      (error) => {
        console.log(error);
        this.encharge=false;
      },
      () => {
        upim
          .snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
           // = downloadURL;
            console.log(downloadURL);
            this.magasin.image=downloadURL;
            this.encharge=false;
            this.charger=true;
            this.magasin.nomimg=upim.snapshot.ref.name;
          });


      }
    );
  }
  supprimer(){
    this.fireUtils.delMagasin();
  }*/

  annuler(){
    this.activeModal.close();

  }

}
