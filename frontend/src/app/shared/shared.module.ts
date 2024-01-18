import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterLink } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";

@NgModule({
  declarations: [
    ArticleCardComponent,
  ],
  exports: [
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    CarouselModule
  ]
})
export class SharedModule { }
