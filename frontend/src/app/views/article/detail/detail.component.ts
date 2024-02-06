import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from "../../../shared/services/article.service";
import { ActivatedRoute, Params } from "@angular/router";
import { PopularArticleType } from "../../../../types/popular-article.type";
import { Subscription, switchMap } from "rxjs";
import { ArticleType } from "../../../../types/article.type";
import { environment } from "../../../../environments/environment";
import { GetCommentsType } from "../../../../types/get-comments.type";
import { CommentsService } from "../../../shared/services/comments.service";
import { AuthService } from "../../../core/auth/auth.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActionCommentsType } from "../../../../types/action-comments.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  articles: PopularArticleType[] = [];
  article: ArticleType;
  comments: GetCommentsType[] = [];
  serverImagePath = environment.serverImagePath;
  isLogged: boolean = false;
  newComment: string = '';

  private authSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  private commentSubscription: Subscription | null = null;

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private commentsService: CommentsService) {
    this.article = {
      text: '',
      comments: [],
      commentsCount: 0,
      id: '',
      title: '',
      description: '',
      image: '',
      date: '',
      category: '',
      url: ''
    }

    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLogged$
      .subscribe((isLoggedIn: boolean) => {
        this.isLogged = isLoggedIn;
      })

    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.articleService.getRelatedArticle(params['url'])
          .subscribe((data: PopularArticleType[]) => {
            this.articles = data;
          })
      })

    this.getArticleDetail();
  }

  addComment(): void {
    if (this.article) {
      this.commentSubscription = this.commentsService.addComment(this.article.id, this.newComment)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            const error = data.message;
            this._snackBar.open(error);
          }

          this.newComment = '';
          this._snackBar.open('Комментарий отправлен!');
          this.getArticleDetail();
        })
    }
  }

  getMoreComments(): void {
    const params: { offset: number, article: string } = {
      offset: this.comments.length,
      article: this.article.id
    }

    this.commentSubscription = this.commentsService.getComments(params)
      .subscribe((data: { allCount: number, comments: GetCommentsType[] }) => {
        data.comments.forEach((item: GetCommentsType) => {
          if (this.comments.length < data.allCount) {
            this.comments.push(item);
          }
        })

        this.getActionsComments();
      })
  }

  getArticleDetail(): void {
    this.routeSubscription = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => this.articleService.getArticle(params['url']))
      )
      .subscribe((data: ArticleType) => {
        this.article = data;
        this.comments = data.comments;

        this.getActionsComments();
      })
  }

  getActionsComments(): void {
    if (this.isLogged) {
      this.commentSubscription = this.commentsService.getArticleCommentActionsForUser(this.article.id)
        .subscribe((data: ActionCommentsType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          this.comments.map((item: GetCommentsType) => {
            (data as ActionCommentsType[]).forEach((action: ActionCommentsType) => {
              if (action.comment === item.id) {
                item.action = action.action;
                item.id = action.comment
              }
            })
            return item;
          })
        })
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.commentSubscription?.unsubscribe();
  }
}
