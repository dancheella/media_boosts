import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from "../../../shared/services/article.service";
import { PopularArticleType } from "../../../../types/popular-article.type";
import { debounce, debounceTime, Subscription } from "rxjs";
import { CategoryType } from "../../../../types/category.type";
import { CategoryService } from "../../../shared/services/category.service";
import { ActiveParamsType } from "../../../../types/active-params.type";
import { ActiveParamsUtil } from "../../../shared/utils/active-params.util";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  articles: PopularArticleType[] = [];
  categories: CategoryType[] = [];
  pages: number[] = [];
  activeParams: ActiveParamsType = { categories: [] };

  private subscription: Subscription | null = null;

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.subscription = this.categoryService.getCategories()
      .subscribe((categories: CategoryType[]) => {
        this.categories = categories;
      });

    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);

      this.articleService.getArticle(this.activeParams)
        .subscribe((data: { count: number, pages: number, items: PopularArticleType[] }) => {
          this.pages = [];
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i);
          }

          this.articles = data.items;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
