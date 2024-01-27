import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterLink } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";
import { FilterComponent } from "./components/filter/filter.component";
import { AppliedFilterComponent } from './components/applied-filter/applied-filter.component';
import { PopupComponent } from './components/popup/popup.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ArticleCardComponent,
    FilterComponent,
    AppliedFilterComponent,
    PopupComponent
  ],
  exports: [
    ArticleCardComponent,
    FilterComponent,
    AppliedFilterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
