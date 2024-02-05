import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PopularArticleType } from "../../../types/popular-article.type";
import { ActiveParamsType } from "../../../types/active-params.type";
import { ArticleType } from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getPopularArticle(): Observable<PopularArticleType[]> {
    return this.http.get<PopularArticleType[]>(environment.apiURL + 'articles/top');
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.apiURL + 'articles/' + url);
  }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: PopularArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items: PopularArticleType[] }>(environment.apiURL + 'articles', {
      params: params
    });
  }

  getRelatedArticle(url: string): Observable<PopularArticleType[]> {
    return this.http.get<PopularArticleType[]>(environment.apiURL + 'articles/related/' + url);
  }
}
