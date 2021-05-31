import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modeles/User';
import { ToastrService } from 'ngx-toastr';
import { SerciceLivreurService } from 'src/app/Services/sercice-livreur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  loginame: String;
  password: String;
  user: User;
  name: string;
  constructor(
    private router: Router,
    public api: SerciceLivreurService,
    private toastr: ToastrService
  ) {}

  loginAdmin() {
    console.log(this.password);
    console.log(this.loginame);

    this.api.login(this.loginame).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);

        if (this.user.password == this.password) {
          //alert('login reussie')
          this.name = this.user.usename;
          localStorage.setItem('admin', this.name);
          this.api.islogin = true;
          if (this.user.role == 'Admin') {
            this.toastr.success('Authentification  avec Success');
            this.router.navigate(['/home']);
          } else {
            console.log(this.user);
            this.toastr.warning("Vous n'avez pas le droit d'accès ");
          }
        } else {
          this.toastr.warning('Mot de Passe  Incorrecte ');
        }
      },
      (error) => this.toastr.warning('Login Incorrecte ')
    );
  }

  ngOnInit(): void {}
}
