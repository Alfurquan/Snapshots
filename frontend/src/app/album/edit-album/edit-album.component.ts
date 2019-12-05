import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlbumsService } from "../../service/albums.service";
import { Album } from "../../models/album";

@Component({
  selector: "app-edit-album",
  templateUrl: "./edit-album.component.html",
  styleUrls: ["./edit-album.component.css"]
})
export class EditAlbumComponent implements OnInit {
  albumId: String;
  selectedFile: File = null;
  album: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AlbumsService
  ) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.albumId = params.id;
    });
    this.album = this.service.getAlbum(this.albumId).subscribe(response => {
      this.album = response.json();
    });
    console.log("album found", this.album);
  }

  ngOnInit() {}
  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(album) {
    console.log("album", album);
    this.service
      .editAlbum(album, this.selectedFile, this.albumId)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/show/" + this.albumId]);
      });
  }
}
