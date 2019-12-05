import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PhotosService } from "../../service/photos.service";
import { AlbumsService } from "../../service/albums.service";
import { Console } from "@angular/core/src/console";
import { environment } from "../../../environments/environment";
import { RegisterService } from "../../service/register.service";
import { AuthGuard } from "../../service/auth-guard.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { ConfirmDialogService } from "../../service/confirm-dialog.service";

@Component({
  selector: "app-album-details",
  templateUrl: "./album-details.component.html",
  styleUrls: ["./album-details.component.css"]
})
export class AlbumDetailsComponent implements OnInit {
  albumId: String;
  album: any;
  photos: [];
  username: any;
  user: any;
  loading = true;
  loaded = false;
  url = environment.url;
  constructor(
    private photosService: PhotosService,
    private albumService: AlbumsService,
    private route: ActivatedRoute,
    private UserService: RegisterService,
    private authGuard: AuthGuard,
    private router: Router,
    public toastr: ToastrManager,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.albumId = params.id;
    });
    this.albumService.getAlbum(this.albumId).subscribe(response => {
      this.album = response.json();
      console.log("album", this.album);
    });
    this.UserService.getUser(this.albumId).subscribe(response => {
      console.log("user", response.json());
      this.loading = false;
      this.loaded = true;
      this.username = response.json().firstname;
      this.user = response.json();
    });
  }

  ngOnInit() {
    this.photosService.getPhotos(this.albumId).subscribe(response => {
      this.photos = response.json();
      console.log("photos11", response.json());
    });
  }
  public openConfirmationDialog() {
    this.confirmDialogService
      .confirm(
        "Delete Album",
        "Do you really want to delete " + this.album.title + " ?",
        "Yes",
        "No",
        "lg"
      )
      .then(confirmed => {
        if (confirmed) {
          this.deleteAlbum(this.albumId);
        }
      })
      .catch(() =>
        console.log(
          "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
      );
  }
  checkIfOwner(album) {
    console.log("ownerAlbum", album);
    if (album.user === localStorage.getItem("userid")) {
      return true;
    }
    return false;
  }
  likeAlbum(id) {
    console.log("liked", id);
    this.authGuard.canActivate();
    this.findIfUserHasLiked();
    this.albumService.likeAlbum(id).subscribe(response => {
      console.log("success");
    });
  }

  deleteAlbum(id) {
    console.log("called delete", id);

    this.albumService.deleteAlbum(id).subscribe(
      response => {
        console.log(response);
        this.toastr.successToastr(
          `${this.album.title} was successfully deleted`,
          "Success!"
        );
        this.router.navigate(["/albums"]);
      },
      (error: Response) => {
        alert("Something went wrong");

        this.router.navigate(["/albums"]);
      }
    );
  }
  checkIfPhotosExists(album) {
    if (album.photo.length > 0) return true;
    else return false;
  }
  findIfUserHasLiked() {
    var found = false;
    var removeIndex;
    for (var i = 0; i < this.album.likes.length; i++) {
      if (this.album.likes[i].user == localStorage.getItem("userid")) {
        found = true;
        removeIndex = i;
        break;
      }
    }
    console.log("found", found);
    if (found) {
      this.album.likes.splice(removeIndex, 1);
    } else {
      this.album.likes.unshift({ user: localStorage.getItem("userid") });
    }
  }
}
