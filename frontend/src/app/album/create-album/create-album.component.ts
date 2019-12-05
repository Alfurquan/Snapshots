import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlbumsService } from "../../service/albums.service";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-create-album",
  templateUrl: "./create-album.component.html",
  styleUrls: ["./create-album.component.css"]
})
export class CreateAlbumComponent implements OnInit {
  privacy = "public";
  selectedFile: File = null;
  constructor(
    private service: AlbumsService,
    private router: Router,
    public toastr: ToastrManager
  ) {}
  ngOnInit() {}

  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(album) {
    if (this.selectedFile === null) {
      this.toastr.errorToastr("Please select a cover Image", "Oops!");
    } else {
      this.service.createAlbum(album, this.selectedFile).subscribe(
        response => {
          console.log(response);
          this.toastr.successToastr("Album created successfully", "Success!");
          this.router.navigate(["/albums"]);
        },
        (error: Response) => {
          this.toastr.errorToastr("Something went wrong try again", "Oops!");
        }
      );
    }
  }
}
