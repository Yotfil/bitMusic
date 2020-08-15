import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.authenticate$.subscribe(
      userAuth => {
        console.log("userAuth --> ", userAuth);
        this.user = userAuth
      }
    )
  }

  ngOnInit(): void {
  }

  destroySession(){
    this.userService.removeToken();
    this.router.navigate(['/']);

  }

}
