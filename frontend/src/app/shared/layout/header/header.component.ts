import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { UserInfoType } from "../../../../types/user-info.type";
import { DefaultResponseType } from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  userName: string = '';

  private subscription: Subscription | null = null;

  constructor(private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.subscription = this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })

    this.getUserName();
  }

  getUserName(): void {
    if (this.isLogged) {
      this.userService.getUserInfo()
        .subscribe((data: UserInfoType | DefaultResponseType) => {
          this.userName = (data as UserInfoType).name
        })
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.userService.userName = null;
    this._snackBar.open('Выход выполнен успешно!');
    this.router.  navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
