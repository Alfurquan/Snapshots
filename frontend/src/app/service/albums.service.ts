import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AlbumsService {
  albums: any[];
  constructor(private apiService: ApiService) {}

  //method to create a new album
  createAlbum(album, selectedFile): Observable<any> {
    console.log("album", album);
    const uploadData = new FormData();
    uploadData.append("title", album.title);
    console.log(album.title);
    uploadData.append("description", album.description);
    console.log(album.description);
    uploadData.append("coverImage", selectedFile);
    console.log(selectedFile);
    uploadData.append("privacy", album.privacy);
    return this.apiService.post("/albums", uploadData);
  }

  //method to get all the albums
  getAlbums(): Observable<any> {
    console.log("token", localStorage.getItem("token"));
    return this.apiService.get("/albums");
  }
  //method to delete an album by id
  deleteAlbum(id): Observable<any> {
    return this.apiService.delete("/albums/" + id);
  }

  //method to get an album by id
  getAlbum(id): Observable<any> {
    return this.apiService.get("/albums/" + id);
  }

  //method to edit an albun
  editAlbum(album, selectedFile, id): Observable<any> {
    console.log("album", album);
    const uploadData = new FormData();
    uploadData.append("title", album.title);
    console.log(album.title);
    uploadData.append("description", album.description);
    console.log(album.description);
    uploadData.append("coverImage", selectedFile);
    console.log(selectedFile);
    uploadData.append("privacy", album.privacy);
    console.log(album.privacy);
    console.log("id", id);
    return this.apiService.put("/albums/" + id, uploadData);
  }

  //method to like an album
  likeAlbum(id): Observable<any> {
    console.log("service", id);
    console.log("token", localStorage.getItem("token"));
    return this.apiService.post("/albums/like/" + id, "");
  }

  //method to get all albums of user
  getAlbumsOfUser(id): Observable<any> {
    return this.apiService.get("/users/albums/" + id);
  }
}
