import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-song',
  templateUrl: './register-song.component.html',
  styleUrls: ['./register-song.component.css']
})
export class RegisterSongComponent implements OnInit {

  songForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    alert("acá llegó")

  }


}
