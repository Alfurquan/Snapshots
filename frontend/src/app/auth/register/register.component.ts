import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../service/register.service";
import { User } from "../../models/user";

import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  selectedFile: File = null;
  constructor(
    private service: RegisterService,
    private router: Router,
    public toastr: ToastrManager
  ) {}
  userModel = new User();
  ngOnInit() {}
  onfileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(user) {
    console.log("file", this.selectedFile);
    if (this.selectedFile === null) {
      this.toastr.errorToastr("Please select a profile Image", "Oops!");
    } else {
      this.service.registerUser(user, this.selectedFile).subscribe(
        response => {
          this.userModel = response.json();
          this.toastr.successToastr(
            "Successfully registered! login to continue",
            "Success!"
          );
          this.router.navigate(["/login"]);
        },
        (error: Response) => {
          if (error.status == 400) {
            this.toastr.errorToastr("User Email already Registered", "Oops!");
          } else {
            this.toastr.errorToastr("Something went wrong try again", "Oops!");
          }
        }
      );
    }
  }
}
