import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RegisterService } from "./register.service";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private registerService: RegisterService,
    private router: Router,
    public toastr: ToastrManager
  ) {}

  canActivate() {
    if (this.registerService.isLoggedIn()) return true;

    this.toastr.warningToastr("Login to continue");
    this.router.navigate(["/login"]);
    return false;
  }
}
