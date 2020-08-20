import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { copyFileSync } from 'fs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user;
  image: File;
  userForm: FormGroup;
  apiURL: String;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.apiURL = this.userService.apiURL;
    this.user = this.userService.infoUser();
    console.log("this.user --> ", this.user)
    this.updateFormValidetor();
    
  }

  ngOnInit(): void {
  }

  /**
   * Función para validar los elementos del formulario
   */
  updateFormValidetor(){
    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email] ],
      image: [null, this.user.image == 'null' ? Validators.required : [] ]
    })
  }

  /**
   * Función para preparar la imagen y poderla enviar a la API.
   * @param image => El input donde está la imagen.
   */
  prepareImage(image: any){
    this.image = image.target.files[0];
  }

  updateUser(){
    if(this.userForm.valid){
      const dataUser = this.userForm.value;
      const formUser = new FormData();
      formUser.append('firstName', dataUser.firstName);
      formUser.append('lastname', dataUser.lastname);
      formUser.append('email', dataUser.email);
      if(this.image){
        formUser.append('image', this.image);
      }
      
      this.userService.updateUser(formUser, this.user.sub).subscribe(
        (userUpdated) => {
          this.userService.saveToken(userUpdated['token']);
          this.user = this.userService.infoUser();
          alert("Se modificaron los datos")
        },(error) => {
            console.log("Tenemos un error: ", error);
        }
      )

    }else{
      alert("Error");
    }
  }

}
