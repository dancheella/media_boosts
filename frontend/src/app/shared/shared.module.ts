import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterLink } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";
import { FilterComponent } from "./components/filter/filter.component";
import { AppliedFilterComponent } from './components/applied-filter/applied-filter.component';
import { PopupComponent } from './components/popup/popup.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CommentComponent } from "./components/comment/comment.component";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ArticleCardComponent,
    FilterComponent,
    AppliedFilterComponent,
    PopupComponent,
    CommentComponent,
    LoaderComponent
  ],
  exports: [
    ArticleCardComponent,
    FilterComponent,
    AppliedFilterComponent,
    CommentComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
