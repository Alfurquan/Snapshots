import { Component, OnInit } from "@angular/core";
import { AlbumsService } from "../../service/albums.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { AuthGuard } from "../../service/auth-guard.service";
import { CoreEnvironment } from "@angular/compiler/src/compiler_facade_interface";
@Component({
  selector: "app-albums",
  templateUrl: "./albums.component.html",
  styleUrls: ["./albums.component.css"]
})
export class AlbumsComponent implements OnInit {
  albums: any[];
  album: any;
  username: any;
  length: any;
  url = environment.url;
  constructor(
    private service: AlbumsService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}

  ngOnInit() {
    console.log("calling service");
    this.service.getAlbums().subscribe(response => {
      this.albums = response.json();
      console.log("albums1", this.albums);
    });
  }
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  // getAllAlbums() {
  //   this.albums = this.service.getAlbums();
  // }
}
