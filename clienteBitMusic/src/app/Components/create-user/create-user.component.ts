import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createValidator();
  }

  ngOnInit(): void {
  }

  /**
   * Función creada para agregar las validaciones de nuestro formulario.
   */
  createValidator(){
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateEmailField] ],
      password: ['', Validators.required]
    })
  }

  /**
   * Función que permite conectarse al servicio para registrar un usuario.
   */
  registerUser(){
    if(this.userForm.valid){
      this.userService.createUser(this.userForm.value).subscribe(
        (createdUser) => {
          alert("Usuario registrado correctamente")
        },(error) => {
          console.log("error al registrar el usuario", error)
        }
      )
    }else{
      alert("Debes llenar todos los campos")
    }
  }

  validateEmailField(emailField: AbstractControl){
    const email = emailField.value.split('@')[1];
    console.log('email --> ', email)
    //paola.cuadros@bit.institute
    /**
     * ['paola.cuadros', 'bit.institute'] => split => corta el elemento
     */

    if(email != 'bit.institute'){
      return { emailInvalid: true };
    }
    return null;
  }

}
