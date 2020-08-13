import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-register-song',
  templateUrl: './register-song.component.html',
  styleUrls: ['./register-song.component.css']
})
export class RegisterSongComponent implements OnInit {

  songForm: FormGroup;
  public file: File;
  constructor(
    private formBuilder: FormBuilder,
    private songService: SongService
  ) {
    this.validateForm();
  }

  /** Nos permite cargar tareas pesadas. */
  ngOnInit(): void {
  }

  validateForm(){
    this.songForm = this.formBuilder.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      file: [null, Validators.required],
      author: ['5f3339e0f716a43944cd56b8', Validators.required],
    })
  }

  registerSong(){
    if(this.songForm.valid){
      
      const song = this.songForm.value;

      const formData = new FormData();
      formData.append('name', song.name);
      formData.append('duration', song.duration);
      formData.append('file', this.file);
      formData.append('author', song.author);

      this.songService.createSong(formData).subscribe(
        (createdSong) => {
          console.log("La canción se creó", createdSong)
        },
        (error) => {
          console.error("Error al crear la canción", error)
        }
      );

    }else{
      alert("Error, debes llenar todos los campos")
    }

  }

  prepareSong(event: any){
    this.file = <File>event.target.files[0];
  }


}
