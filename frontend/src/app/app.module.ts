import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { MainComponent } from './views/main/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SharedModule } from "./shared/shared.module";
import { CarouselComponent } from "./views/main/carousel/carousel.component";
import { ServiceCardComponent } from "./views/main/service-card/service-card.component";
import { ReviewsComponent } from './views/main/reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CarouselComponent,
    ServiceCardComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    MatSnackBarModule,
    MatMenuModule,
    CarouselModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
