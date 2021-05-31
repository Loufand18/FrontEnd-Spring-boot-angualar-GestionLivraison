import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livreur } from './../modeles/Livreur';
import { User } from './../modeles/User';
import { Livreur_trajet } from './../modeles/Livreur_trajet';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Trajet } from '../modeles/Trajet';

@Injectable({
  providedIn: 'root',
})
export class SerciceLivreurService {
  JsonServeur = environment.urlServeurApi;
  //JsonServeur='http://localhost:8081';
  // private baseUrl = 'http://localhost:8080';
  private baseUrl = '/api/sonuna';
  private baseUrl1 = '/api/users/5';
  public dataForm: FormGroup;
  islogin = false;
  admin = false;
  suser = false;
  constructor(private http: HttpClient) {}
  Attribuer(formData: FormData): Observable<void> {
    return this.http.put<void>(
      this.JsonServeur + '/api/attribuerLivreurTrajet',
      formData
    );
  }
  deleteTrajetById(idRV: number): Observable<void> {
    return this.http.delete<void>(
      this.JsonServeur + '/api/supprimerTrajet/' + idRV
    );
  }
  createData(formData: User): Observable<User> {
    return this.http.post<User>(
      this.JsonServeur + '/api/ajoutUtilisateur',
      JSON.stringify(formData),
      this.httpOptions
    );
  }
  deleteUserById(idRV: number): Observable<void> {
    return this.http.delete<void>(
      this.JsonServeur + '/api/supprimerUser/' + idRV
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.JsonServeur + '/api/getUtilisateurs');
  }
  login(login: String): Observable<User> {
    return this.http.get<User>(this.JsonServeur + '/api/users/5/' + login);
  }
  AffecterTrajLiv(formData: FormData): Observable<Livreur_trajet> {
    return this.http.post<Livreur_trajet>(
      this.JsonServeur + '/api/ajouterLivTrajet',
      formData
    );
  }

  AjoutTrajet(rv: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(
      this.JsonServeur + '/api/ajouterTrajet',
      JSON.stringify(rv),
      this.httpOptions
    );
  }
  getTrajet(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.JsonServeur + '/api/getTrajet');
  }

  getLivreurTrajet(): Observable<Livreur_trajet[]> {
    return this.http.get<Livreur_trajet[]>(
      this.JsonServeur + '/api/getLivTrajet'
    );
  }

  getLivreur(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(this.JsonServeur + '/api/getLivreur');
  }
  deleteLivreurById(idRV: number): Observable<void> {
    return this.http.delete<void>(
      this.JsonServeur + '/api/supprimerLivreur/' + idRV
    );
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  Ajouterd(rv: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(
      this.JsonServeur + '/api/ajouterLiv',
      JSON.stringify(rv),
      this.httpOptions
    );
  }

  AjouterLivreur(formData: FormData): Observable<Livreur> {
    return this.http.post<Livreur>(
      this.JsonServeur + '/api/ajoutLivreur',
      formData
    );
  }
  AttribuerTrajetLivreur(formData: FormData): Observable<Livreur> {
    return this.http.put<Livreur>(
      this.JsonServeur + '/api/attribuerTrajetLivreur',
      formData
    );
  }

  NoterLivreur(formData: FormData): Observable<Livreur> {
    return this.http.put<Livreur>(
      this.JsonServeur + '/api/noterLivreur',
      formData
    );
  }
  updateLivreur(formData: FormData): Observable<Livreur> {
    return this.http.put<Livreur>(
      this.JsonServeur + '/api/updateLivreur',
      formData
    );
  }
}
