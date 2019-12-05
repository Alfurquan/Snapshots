import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RegisterService } from "../../service/register.service";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { User } from "../../models/user";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private service: RegisterService,
    private router: Router,
    public toastr: ToastrManager
  ) {}
  userModel = new User();
  invalidLogin: Boolean;
  ngOnInit() {}
  onSubmit(user) {
    console.log("user", user);
    this.service.loginUser(user).subscribe(
      response => {
        let result = response.json();
        console.log(result);
        if (result && result.token) {
          this.invalidLogin = false;
          this.service.setSession(result);
        }
        this.toastr.successToastr(
          `Succesfully logged in as ${user.email}`,
          "Success!"
        );
        this.router.navigate(["/albums"]);
      },
      (error: Response) => {
        if (error.status == 404) {
          this.invalidLogin = true;
          this.toastr.errorToastr("user not found", "oops!");
        } else if (error.status == 400) {
          this.invalidLogin = true;
          this.toastr.errorToastr("username/password does'nt match", "oops!");
        }
      }
    );
  }
}
