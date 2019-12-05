import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private headers: Headers;
  constructor(private http: Http) {}

  get(path): Observable<any> {
    return this.http.get(environment.api_url + path, {
      headers: new Headers({
        Authorization: localStorage.getItem("token")
      })
    });
  }
  post(path, body): Observable<any> {
    if (path === "/users/login") {
      this.headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
    } else {
      this.headers = new Headers({
        Authorization: localStorage.getItem("token")
      });
    }
    console.log("headers", this.headers);
    console.log("body", body);
    return this.http.post(environment.api_url + path, body, {
      headers: this.headers
    });
  }

  put(path, body): Observable<any> {
    return this.http.put(environment.api_url + path, body, {
      headers: new Headers({
        Authorization: localStorage.getItem("token")
      })
    });
  }
  delete(path): Observable<any> {
    return this.http.delete(environment.api_url + path, {
      headers: new Headers({
        Authorization: localStorage.getItem("token")
      })
    });
  }
}
