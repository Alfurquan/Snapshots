import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";

import { RegisterService } from "./service/register.service";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { ToastrModule } from "ng6-toastr-notifications";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthGuard } from "./service/auth-guard.service";
import { ApiService } from "./service/api.service";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ConfirmDialogService } from "./service/confirm-dialog.service";
import { AlbumsModule } from "./album/album.module";
import { AuthModule } from "./auth/auth.module";
import { PhotoModule } from "./photos/photo.module";
import { ProfileModule } from "./profiles/profile.module";

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AlbumsModule,
    AuthModule,
    PhotoModule,
    ProfileModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([{ path: "", component: HomeComponent }]),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [RegisterService, AuthGuard, ApiService, ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
