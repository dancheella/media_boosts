import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PopularArticleType } from "../../../types/popular-article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticle(): Observable<PopularArticleType[]> {
    return this.http.get<PopularArticleType[]>(environment.apiURL + 'articles/top');
  }
}
