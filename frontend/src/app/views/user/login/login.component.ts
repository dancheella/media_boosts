import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/auth/auth.service";
import { LoginResponseType } from "../../../../types/login-response.type";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { UserInfoType } from "../../../../types/user-info.type";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  })

  private authSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authSubscription = this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const loginResponse: LoginResponseType = (data as LoginResponseType);
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
              error = 'Ошибка авторизации!';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this._snackBar.open('Авторизация прошла успешно!');
            this.setUserInfo();
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации!');
            }
          }
        });
    }
  }

  setUserInfo() {
    if (this.authService.getIsLoggedIn()) {
      this.userSubscription = this.userService.getUserInfo()
        .subscribe((data: UserInfoType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          const userInfo: UserInfoType = data as UserInfoType;

          if (userInfo.name) {
            this.userService.userName = userInfo.name;
          }
        })
    }
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
