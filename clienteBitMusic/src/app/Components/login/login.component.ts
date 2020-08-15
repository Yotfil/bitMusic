import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router  } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.validateForm();
  }

  ngOnInit(): void {
  }

  validateForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required] ],
    })
  }

  login(){
    if(this.formLogin.valid){
      this.userService.login(this.formLogin.value).subscribe(
        (userLogged) =>{
          this.userService.saveToken(userLogged['token']);
          this.router.navigate(['/']);
        },(error) => {
          alert('Los datos no coinciden');
          console.log('Error ', error)
        }
      )
    }else{
      alert("Debes llenar todos los campos")
    }
  }

}
