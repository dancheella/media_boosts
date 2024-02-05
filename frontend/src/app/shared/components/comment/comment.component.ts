import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetCommentsType } from "../../../../types/get-comments.type";
import { AuthService } from "../../../core/auth/auth.service";
import { Subscription } from "rxjs";
import { UserCommentActionsType } from "../../../../types/user-comment-actions.type";
import { HttpErrorResponse } from "@angular/common/http";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommentsService } from "../../services/comments.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: GetCommentsType;
  isLogged: boolean = false;
  like: boolean = false;
  dislike: boolean = false;
  likesCount: number = 0;
  dislikesCount: number = 0;
  private authSubscription: Subscription | null = null;
  private commentsSubscription: Subscription | null = null;
  UserCommentActionsType = UserCommentActionsType;

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private commentsService: CommentsService) {
    this.comment = {
      id: '',
      text: '',
      date: '',
      likesCount: 0,
      dislikesCount: 0,
      user: {
        id: '',
        name: ''
      },
      action: ''
    }

    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLogged$
      .subscribe((isLoggedIn: boolean) => {
        this.isLogged = isLoggedIn;
      })

    setTimeout(() => {
      this.checkOptionsValue();
    }, 100);

    this.likesCount = this.comment.likesCount;
    this.dislikesCount = this.comment.dislikesCount;
  }

  checkOptionsValue(): void {
    this.like = this.comment.action === UserCommentActionsType.like;
    this.dislike = this.comment.action === UserCommentActionsType.dislike;
  }

  addLikeOrDislike(actionType: UserCommentActionsType): void {
    if (this.isLogged) {
      let shouldUpdateLikesCount = false;
      let shouldUpdateDislikesCount = false;

      if (actionType === UserCommentActionsType.like && !this.like) {
        shouldUpdateLikesCount = true;
        if (this.dislike) {
          this.dislike = false;
          this.dislikesCount--;
        }
      } else if (actionType === UserCommentActionsType.dislike && !this.dislike) {
        shouldUpdateDislikesCount = true;
        if (this.like) {
          this.like = false;
          this.likesCount--;
        }
      }

      if (shouldUpdateLikesCount || shouldUpdateDislikesCount) {
        this.commentsSubscription = this.commentsService.applyAction(this.comment.id, actionType)
          .subscribe(() => {
            if (shouldUpdateLikesCount) {
              this.like = true;
              this.likesCount++;
            } else if (shouldUpdateDislikesCount) {
              this.dislike = true;
              this.dislikesCount++;
            }
            this._snackBar.open('Ваш голос учтен');
          });
      } else {
        this.commentsSubscription = this.commentsService.applyAction(this.comment.id, actionType)
          .subscribe((data: DefaultResponseType) => {
            if (!data.error) {
              if (actionType === UserCommentActionsType.like) {
                this.like = false;
                this.likesCount--;
              } else if (actionType === UserCommentActionsType.dislike) {
                this.dislike = false;
                this.dislikesCount--;
              }
            }
          });
      }
    } else {
      this._snackBar.open('Необходимо авторизоваться');
    }
  }

  addViolate(): void {
    if (this.isLogged) {
      this.commentsSubscription = this.commentsService.applyAction(this.comment.id, UserCommentActionsType.violate)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this._snackBar.open('Жалоба отправлена!');
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Жалоба уже отправлена!');
            }
          }
        });
    } else {
      this._snackBar.open('Необходимо авторизоваться!');
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.commentsSubscription?.unsubscribe();
  }
}
