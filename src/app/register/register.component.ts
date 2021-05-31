import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SerciceLivreurService } from '../Services/sercice-livreur.service';
import { User } from '../modeles/User';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public crudApi: SerciceLivreurService ,public fb: FormBuilder,
    private router : Router,private toastr: ToastrService) { }

 message='';
  ngOnInit() {


    this.infoForm();
   }

name=''
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        usename: ['', [Validators.required, Validators.minLength(5)]],
       // role: ['', [Validators.required, Validators.minLength(8)]],
       role:'User',
        email: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ppwd: ['', [Validators.required, Validators.minLength(8)]],
        });
    }



  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {

    if (this.crudApi.dataForm.value.password == this.crudApi.dataForm.value.ppwd)
    {
      console.log(this.crudApi.dataForm.value);
     // this.toastr.success( 'Validation Faite avec Success');
        this.addData();


    }
    else
    {
      console.log(this.crudApi.dataForm.value.password,this.crudApi.dataForm.value.ppwd)
    this.toastr.warning( 'Vérifiet votre de passe ...');
    }
}



addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).subscribe((data:User) => {

    this.toastr.success( 'Validation Faite avec Success');
    this.name=this.crudApi.dataForm.value.usename
    localStorage.setItem('name', this.name);
    this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/accueil']);

  },
  (error:HttpErrorResponse)=>{
    this.message = 'Enregistrement non reussi';
    alert(this.message)
    alert(error.message)
  }
   );


}

}
