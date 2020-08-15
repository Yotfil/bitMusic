/** Este guardian nos va  apermitir validar si un usuario puede o no ingresar a una página de nuestros proyecto.  */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private user: UserService,
    private route: Router
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Si el usuario si está autenticado
    if(this.user.isAuthenticated()){
      return true;
    }
    this.route.navigate(['/']);
    return false;

  }
  
}
