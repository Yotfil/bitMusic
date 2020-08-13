import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit {
  nombre = 'Lina';
  sons: Array<any>;
  apiURL: String;

  constructor(
    private songService: SongService
  ) {
    this.apiURL = this.songService.apiURL
  }

  /** Tarea pesadas como traer todas las canciones almacenadas en la DB */
  ngOnInit(): void {
    this.loadSongs()
  }

  loadSongs(){
    this.songService.getSongs().subscribe(
      ( allSongs: Array<any> ) =>{
        this.sons = allSongs
      }
    )
  }

}
