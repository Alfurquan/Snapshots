import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotosService } from "../../service/photos.service";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-create-photo",
  templateUrl: "./create-photo.component.html",
  styleUrls: ["./create-photo.component.css"]
})
export class CreatePhotoComponent implements OnInit {
  albumId: any;
  selectedFile: File = null;
  constructor(
    private service: PhotosService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrManager
  ) {
    this.route.params.subscribe(params => {
      this.albumId = params.id;
      console.log(this.albumId);
    });
  }
  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit() {}
  onSubmit(photo) {
    if (this.selectedFile === null) {
      this.toastr.errorToastr("Please select a photo", "Oops!");
    } else {
      this.service
        .createPhoto(photo, this.selectedFile, this.albumId)
        .subscribe(response => {
          console.log(response.json());
          this.router.navigate(["/show" + "/" + this.albumId]);
        });
    }
  }
}
