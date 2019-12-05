import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../service/register.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  username: String;
  user: any;
  userId: any;
  constructor(
    public service: RegisterService,
    public toastr: ToastrManager,
    private router: Router
  ) {
    this.userId = localStorage.getItem("userid");
    this.username = localStorage.getItem("username");
    this.service
      .getCurrentUser(localStorage.getItem("userid"))
      .subscribe(response => {
        this.user = response.json();
        console.log("navbar user", this.user);
      });
  }
  isLogin: Boolean;

  ngOnInit() {
    this.service.getEmitter().subscribe(payload => {
      this.username = payload.name;
    });
  }

  logout() {
    this.service.logOut();
    this.toastr.successToastr("Successfully logged out", "Success!");
    this.router.navigate(["/"]);
  }
  getUser() {
    return localStorage.getItem("userid");
  }
}
