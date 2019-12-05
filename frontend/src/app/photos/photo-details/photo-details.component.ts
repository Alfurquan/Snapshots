import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { PhotosService } from "../../service/photos.service";
@Component({
  selector: "app-photo-details",
  templateUrl: "./photo-details.component.html",
  styleUrls: ["./photo-details.component.css"]
})
export class PhotoDetailsComponent implements OnInit {
  photoId: any;
  photo: any;
  photoLike: any;
  loading = true;
  url = environment.url;
  constructor(
    private photoService: PhotosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.photoId = params.id;
    });
    this.photoService.getPhoto(this.photoId).subscribe(response => {
      this.photo = response.json();
      this.loading = false;
      console.log("photo", this.photo);
    });
  }
  ngOnInit() {}
  checkIfOwner(photo) {
    console.log("ownerPhoto", photo);
    if (photo.user === localStorage.getItem("userid")) {
      return true;
    }
    return false;
  }
  deletePhoto(id) {
    console.log("delete id", id);
    console.log("album delete id", this.photo.album);
    this.photoService.deletePhoto(this.photo.album, id).subscribe(response => {
      console.log(response.json());
      this.router.navigate(["/show" + "/" + this.photo.album]);
    });
  }
  likePhoto(id) {
    console.log("like id", id);
    this.findIfUserHasLiked();
    this.photoService.likePhoto(id).subscribe(response => {
      console.log("success");
    });
  }
  getPhoto(id) {
    this.photoService.getPhoto(id).subscribe(response => {
      this.photo = response.json();
      console.log("photo", this.photo);
    });
  }
  findIfUserHasLiked() {
    var found = false;
    var removeIndex;
    for (var i = 0; i < this.photo.likes.length; i++) {
      if (this.photo.likes[i].user == localStorage.getItem("userid")) {
        found = true;
        removeIndex = i;
        break;
      }
    }
    console.log("found", found);
    if (found) {
      this.photo.likes.splice(removeIndex, 1);
    } else {
      this.photo.likes.unshift({ user: localStorage.getItem("userid") });
    }
  }
}
