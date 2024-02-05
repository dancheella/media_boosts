import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from "../../shared/shared.module";
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FormsModule } from "@angular/forms";
import { DetailComponent } from "./detail/detail.component";


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ArticleModule { }
