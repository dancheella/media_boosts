import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UserInfoType } from "../../../types/user-info.type";
import { DefaultResponseType } from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userNameKey: string = 'userName';

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<DefaultResponseType | UserInfoType> {
    return this.http.get<DefaultResponseType | UserInfoType>(environment.apiURL + 'users')
  }

  get userName(): null | string {
    return localStorage.getItem(this.userNameKey);
  }

  set userName(name: string | null) {
    if (name) {
      localStorage.setItem(this.userNameKey, name);
    } else {
      localStorage.removeItem(this.userNameKey);
    }
  }
}
