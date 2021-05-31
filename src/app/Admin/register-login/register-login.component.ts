import { Component, OnInit } from '@angular/core';
import { SerciceLivreurService } from 'src/app/Services/sercice-livreur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modeles/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  constructor(public crudApi: SerciceLivreurService ,public fb: FormBuilder,
    private router : Router,private toastr: ToastrService) { }
    name=""
    message='';
    ngOnInit() {


      this.infoForm();
     }


    infoForm() {
      this.crudApi.dataForm = this.fb.group({
          id:0,
          usename: ['', [Validators.required, Validators.minLength(5)]],
         // role: ['', [Validators.required, Validators.minLength(8)]],
         role:'Admin',
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
      this.toastr.success( 'Validation Faite avec Success');
        this.addData();


    }
    else
    {
    this.toastr.warning( 'Vérifiet votre de passe ...');
    }
}



addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).subscribe((data:User) => {
    this.name=this.crudApi.dataForm.value.usename
    localStorage.setItem('admin', this.name);
    this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/home']);

  },
  (error:HttpErrorResponse)=>{
    this.message = 'Enregistrement non reussi';
    this.toastr.warning( this.message);
  }
   );


}



}
