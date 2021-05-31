import { Component, OnInit } from '@angular/core';
import { SerciceLivreurService } from '../../Services/sercice-livreur.service';
import { Livreur } from '../../modeles/Livreur';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modeles/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public api: SerciceLivreurService,
    public router: Router,
    private toastr: ToastrService
  ) {}
  retrievedImage: any;
  nom = '';
  base64Data: any;
  retrieveResonse: any;
  livreur: Livreur[];
  user: User[];
  utilisateur: User[];
  admin: User[];
  totalLivreur = 0;
  totalAdmin = 0;
  totalUtili = 0;
  rv: Livreur[];

  supprimer(id: number) {
    this.api.deleteUserById(id).subscribe(
      (data) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(id);
      }
    );
  }
  getLivreurs() {
    this.api.getLivreur().subscribe(
      (data: Livreur[]) => {
        this.livreur = data;

        for (var i = 0; i < this.livreur.length; i++) {
          this.livreur[i].picByte =
            'data:image/jpeg;base64,' + this.livreur[i].picByte;
        }
        console.log(this.livreur);
        // this.getUsers()
        this.totalLivreur = this.livreur.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getUsers() {
    this.api.getUsers().subscribe(
      (data: User[]) => {
        this.user = data;
        this.admin = data;
        this.utilisateur = data;
        var k = 0,
          z = 0;
        // this.admin.length=0
        // this.utilisateur.length=0
        for (var i = 0; i < this.user.length; i++) {
          if (this.user[i].role == 'Admin') {
            this.totalAdmin++;
          } else {
            this.totalUtili++;
          }
        }
        //  console.log(this.livreur.length);
        //  console.log(this.admin);

        //  console.log(this.utilisateur);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/login-admin']);
  }
  ngOnInit(): void {
    this.nom = localStorage.getItem('admin');

    if (this.nom != null) {
      this.getLivreurs();
      this.getUsers();
    } else {
      this.router.navigate(['/login-admin']);
      this.toastr.warning("Vous n'avez le droit d'acces");
    }
  }
}
