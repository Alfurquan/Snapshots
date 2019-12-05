import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../service/register.service";
import { AlbumsService } from "../../service/albums.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: any;
  albums: any;
  userId: any;
  loading = true;
  url = environment.url;
  constructor(
    private service: RegisterService,
    private albumService: AlbumsService,
    private route: ActivatedRoute
  ) {
    this.service
      .getCurrentUser(localStorage.getItem("userid"))
      .subscribe(response => {
        this.user = response.json();
        console.log("user", this.user);
      });
    this.albumService
      .getAlbumsOfUser(localStorage.getItem("userid"))
      .subscribe(response => {
        this.albums = response.json();
        this.loading = false;
        console.log("albums user", this.albums);
      });
  }

  ngOnInit() {}
}
