import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit {
  nombre = 'Lina';
  songs: Array<any>;
  apiURL: String;
  search: String;
  totSongs: Number;
  page: Number = 1;
  totalTabs: Array<any>;

  constructor(
    private songService: SongService
  ) {
    this.apiURL = this.songService.apiURL
  }

  /** Tarea pesadas como traer todas las canciones almacenadas en la DB */
  ngOnInit(): void {
    this.getTotalSongs();
    this.loadSongs(this.page)
  }

  loadSongs(page: any){
    console.log('this.search -> ', this.search)
    let filter = ''
    if(typeof this.search == "string" && this.search.length > 0){
        filter = `?searchBy=${this.search}`
    }

    //let filter = (typeof this.search == "string" && this.search.length > 0) ? `?searchBy=${this.search}` : '';
    console.log("page --> ", page )
    this.songService.getSongs(filter, page).subscribe(
      ( allSongs: Array<any> ) =>{
        this.totSongs = allSongs.length
        this.songs = allSongs
      }
    )
  }

  changeSong(song, numberSong = ''){
    const audio: HTMLMediaElement = document.getElementById('player') as HTMLMediaElement;

    if(numberSong == ''){
      let dataSong: any = audio.getAttribute('data-song');

      if(song == 'previous'){
        dataSong = dataSong - 1;
      }else{
        dataSong = Number(dataSong) + 1;
      }

      if (dataSong <= 0){
        dataSong = this.totSongs
      }else if (dataSong > this.totSongs ){
        dataSong = '1';
      }
      numberSong = dataSong;

      const nextPrevious = document.getElementById(dataSong) as HTMLMediaElement;
      song = nextPrevious.getAttribute('value')
    }

    const urlSong = `${this.apiURL}/getSongFile/${song}`;
    audio.setAttribute('src', urlSong);
    console.log("numberSong --> ",  numberSong);
    audio.setAttribute('data-song', numberSong);
    audio.play();

  }

  getTotalSongs(){
    this.songService.getTotalSongs().subscribe( ( totAllSongs: any ) => {
      let tabs = Math.ceil(totAllSongs.total / 10);
      this.totalTabs = Array.apply(null, new Array(tabs)).map( (e, i) => ++i  );
      //let array = new Array(tabs);
      //console.log("array --> ", array)
    } )
  }

}
