import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;

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

  get userName(): string | null {
    return this.userService.userName;
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.userService.userName = null;
    this._snackBar.open('Выход выполнен успешно!');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
