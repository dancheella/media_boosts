import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { DefaultResponseType } from "../../../types/default-response.type";
import { GetCommentsType } from "../../../types/get-comments.type";
import { ActionCommentsType } from "../../../types/action-comments.type";
import { CommentsParamsType } from "../../../types/comments-params.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getComments(params: CommentsParamsType): Observable<{ allCount: number, comments: GetCommentsType[] }> {
    return this.http.get<{ allCount: number, comments: GetCommentsType[] }>(environment.apiURL + 'comments', {
      params: params
    });
  }

  addComment(articleId: string, text: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.apiURL + 'comments', {
      text: text,
      article: articleId,
    });
  }

  applyAction(commentId: string, action: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.apiURL + 'comments/' + commentId + '/apply-action', {
      action: action,
    })
  }

  getActionsForComment(commentId: string): Observable<ActionCommentsType[] | DefaultResponseType> {
    return this.http.get<ActionCommentsType[] | DefaultResponseType>(environment.apiURL + 'comments/' + commentId + '/actions');
  }


  getArticleCommentActionsForUser(articleId: string): Observable<ActionCommentsType[] | DefaultResponseType> {
    return this.http.get<ActionCommentsType[] | DefaultResponseType>(environment.apiURL + 'comments/article-comment-actions', {
      params: { articleId: articleId }
    });
  }
}
