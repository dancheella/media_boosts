import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { RequestType } from "../../../types/request.type";
import { DefaultResponseType } from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  createRequest(params: RequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.apiURL + 'requests', params);
  }
}
