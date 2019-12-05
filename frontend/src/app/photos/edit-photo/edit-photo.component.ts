import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotosService } from "../../service/photos.service";
@Component({
  selector: "app-edit-photo",
  templateUrl: "./edit-photo.component.html",
  styleUrls: ["./edit-photo.component.css"]
})
export class EditPhotoComponent implements OnInit {
  photoId: String;
  selectedFile: File = null;
  albumId: any;
  photo: any;
  constructor(
    private photoService: PhotosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.photoId = params.id;
    });
    console.log("photossid", this.photoId);
    this.photoService.getPhoto(this.photoId).subscribe(response => {
      this.photo = response.json();
      this.albumId = this.photo.album;
      console.log("photoss", this.photo);
    });
  }

  ngOnInit() {}
  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(photo) {
    this.photoService
      .editPhoto(photo, this.selectedFile, this.photoId)
      .subscribe(response => {
        console.log(response.json());
        this.router.navigate(["/show/" + this.albumId]);
      });
  }
}
