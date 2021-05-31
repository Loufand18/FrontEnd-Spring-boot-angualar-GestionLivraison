import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerciceLivreurService } from '../Services/sercice-livreur.service';
import { User } from '../modeles/User';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginname : String;
  password : String;
  user:User;
  name : string;
  Wdate;
  annee : 0;
  constructor( private router:Router,public api:SerciceLivreurService,private toastr: ToastrService
    ) { }



  ngOnInit() {
    this.api.islogin = false;
    this.api.admin = false;
    this.api.suser = false;
   // this.Wdate = this.transformDate(new Date());
   // this.annee = (this.Wdate).toString().substring(0,4);
   // localStorage.setItem('annee', this.annee.toString());
    //,private datePipe : DatePipe

  }

  login() {
    console.log(this.loginname)

    this.api.login(this.loginname).subscribe(
      response =>{this.user = response;
        console.log(this.user)

       if (this.user.password == this.password)
       {

        this.name = this.user.usename;
       localStorage.setItem('name', this.name);
        this.api.islogin = true;
        if (this.user.role  == "User")
         {
          this.toastr.success( 'Authentification  avec Success');
        //  this.userService.admin = true;
        this.router.navigate(['/accueil']);


      }
      else
      {
        this.toastr.warning( 'Vous n\'avez pas le droit d\'accès ');

      }
       }
              else
              {
               this.toastr.warning( 'Mot de Passe  Incorrecte ')

               }

          },
         error =>

           this.toastr.warning( 'Login Incorrecte ')


          );




    }
  valider(){
    this.router.navigate(["accueil"]);
  }

 /* transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }*/
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('name');

}

}
