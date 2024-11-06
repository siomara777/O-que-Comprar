import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, AsyncPipe } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';

import { ButtonComponent } from '../button/button.component';
import { Observable } from 'rxjs/internal/Observable';

import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, AsyncPipe, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isHome: boolean = false;
  isAuthenticated$: Observable<boolean>;
  profile!: User | undefined | null;
tokenExpired: any;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private usersService: UsersService
  ) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }
  
  ngOnInit(): void {
    this.isHome = this.router.url === '/home';

    this.auth.user$.subscribe((profile) => {
      if (profile) {
        console.log(profile)
        this.addUserIfNotExists(profile);
        this.profile = profile;
        this.router.navigate([`/shopping-list/${profile?.sub}`]);
      }
    })
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: document.location.origin },
    });
  }

  private addUserIfNotExists(user: User): void {
    if (!user.email) {
      return;
    }

    this.usersService.getUserByEmail(user.email).subscribe(userExists => {
      if (!userExists) {
        const newUser = {
          id: user.sub,
          name: user.name,
          email: user.email
        };
        this.usersService.addUser(newUser).subscribe(() => {
          console.log('Novo usuário adicionado:', newUser);
        });
      }
    });
  }
}
