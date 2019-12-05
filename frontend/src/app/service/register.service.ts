import { Injectable, Output, EventEmitter } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class RegisterService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: ApiService) {}
  registerUser(user, selectedFile): Observable<any> {
    console.log(user);

    //using form data
    const uploadData = new FormData();
    uploadData.append("firstname", user.firstname);
    uploadData.append("lastname", user.lastname);
    uploadData.append("username", user.username);
    uploadData.append("email", user.email);
    uploadData.append("password", user.password);
    uploadData.append("profileImage", selectedFile);
    return this.apiService.post("/users/register", uploadData);
  }

  loginUser(user): Observable<any> {
    console.log(user);
    var body = `email=${user.email}&password=${user.password}`;
    return this.apiService.post("/users/login", body);
  }
  setSession(result) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("timer", result.expiresIn);
    let payload = jwt_decode(result.token);
    localStorage.setItem("userid", payload.id);
    localStorage.setItem("username", payload.name);
    this.fireIsLoggedIn.emit(payload);
  }
  public isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("timer");
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  getUser(id): Observable<any> {
    return this.apiService.get("/users/" + id);
  }
  getCurrentUser(id): Observable<any> {
    return this.apiService.get("/users/current/" + id);
  }

  editUser(user, selectedFile, id): Observable<any> {
    const uploadData = new FormData();
    uploadData.append("firstname", user.firstname);
    uploadData.append("lastname", user.lastname);
    uploadData.append("username", user.username);
    uploadData.append("email", user.email);

    uploadData.append("profileImage", selectedFile);
    return this.apiService.put("/users/" + id, uploadData);
  }
}
