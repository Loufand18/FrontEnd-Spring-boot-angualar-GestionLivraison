import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router:Router) { }
  nom;
  ngOnInit(): void {
    this.nom=localStorage.getItem('name');
  }
  logout(){
    localStorage.removeItem('name')
    this.router.navigate(["login"]);
  }
   Connecter(){

    this.router.navigate(["login"]);
  }

}
