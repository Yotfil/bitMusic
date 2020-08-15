import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Song } from '../models/Song'; //Cargamos el modelo
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiURL: String = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  prepareHeaders(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.user.getToken()
      })
    }
  }

    createSong(formData){
      return this.http.post<Song>(`${this.apiURL}/create-song`, formData, this.prepareHeaders());
    }

    getSongs(filter, page){
      console.log('Esta es la ruta de page --> ', `${page}`)
      return this.http.get(`${this.apiURL}/getAll/${page}${filter}`, this.prepareHeaders())
    }

    getTotalSongs(){
      return  this.http.get(`${this.apiURL}/getTotalSongs`, this.prepareHeaders())
    }

}
