import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Song } from '../models/Song'; //Cargamos el modelo

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiURL: String = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

    createSong(formData){
      return this.http.post<Song>(`${this.apiURL}/create-song`, formData);
    }

    getSongs(filter, page){
      console.log('Esta es la ruta de page --> ', `${page}`)
      return this.http.get(`${this.apiURL}/getAll/${page}${filter}`)
    }

    getTotalSongs(){
      return  this.http.get(`${this.apiURL}/getTotalSongs`)
    }

}
