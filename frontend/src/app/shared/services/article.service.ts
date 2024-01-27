import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PopularArticleType } from "../../../types/popular-article.type";
import { ActiveParamsType } from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getPopularArticle(): Observable<PopularArticleType[]> {
    return this.http.get<PopularArticleType[]>(environment.apiURL + 'articles/top');
  }


  getArticle(params: ActiveParamsType): Observable<{ count: number, pages: number, items:  PopularArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items:  PopularArticleType[] }>(environment.apiURL + 'articles', {
      params: params
    });
  }


}
