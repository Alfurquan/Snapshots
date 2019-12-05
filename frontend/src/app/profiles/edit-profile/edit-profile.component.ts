import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegisterService } from "../../service/register.service";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  user: any;
  userId: any;
  selectedFile: File = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RegisterService
  ) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.userId = params.id;
    });
    this.service.getCurrentUser(this.userId).subscribe(response => {
      this.user = response.json();
      console.log("user found", this.user);
    });
  }

  ngOnInit() {}
  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(user) {
    this.service
      .editUser(user, this.selectedFile, this.userId)
      .subscribe(response => {
        this.router.navigate(["/profile"]);
      });
  }
}
