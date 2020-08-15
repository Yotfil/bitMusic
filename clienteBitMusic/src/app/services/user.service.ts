import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authenticate = new BehaviorSubject<{}>(null); //Creamos una nueva instancia de la variable pra poder utilizarla. <{}> => tipo de dato (null)=> Valor inicial
  authenticate$ = this.authenticate.asObservable();//Esta variable está suscrita, esto quiere decir que podrá estar escuchando todos los cambios que tenga

  apiURL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) {
    this.authenticate.next(this.infoUser()) //Validamos si el usuario inició sesión, esto nos funcionará son importar que recarguemos el navegador,
  }

  createUser(formUser){
    return this.http.post<User>(`${this.apiURL}/register`, formUser);
  }

  login(formLogin){
    return this.http.post<User>(`${this.apiURL}/login`, formLogin);
  }

  /**
   * Metodo para almacenar el token de cuando el usuario hacen login
   * @param token 
   */
  saveToken(token){
    localStorage.setItem('token', token);
    this.authenticate.next(this.infoUser())
  }

  /**
   * Obtener el token.
   */
  getToken(){
    return localStorage.getItem('token');
  }

  /**
   * Función para validar si existe o no un token
   * @returns Boolean true o false
   */
  isAuthenticated(){
    /*if (this.getToken() !== null){
      return true;
    }else{
      return false;
    }*/
    return this.getToken() !== null;
  }

  infoUser(){
    const token = this.getToken();
    if(!token){
      return null;
    }
    let base64URL = token.split('.')[1];
    let base64 = base64URL.replace('-', '+').replace('_', '/'); //Nos permite decodificar la información mucho más facíl.

    return JSON.parse(this.b64DeconeUnicode(base64));
  }

  b64DeconeUnicode(str){
    return decodeURIComponent(atob(str).split('').map( function(c){
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }  ).join(''));
  }

  removeToken(){
    localStorage.removeItem('token');
    this.authenticate.next(null)
  }

}
