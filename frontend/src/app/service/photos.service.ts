import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class PhotosService {
  constructor(private apiService: ApiService) {}

  //Method to add a new photo to an album
  createPhoto(photo, selectedFile, albumId): Observable<any> {
    const uploadData = new FormData();
    console.log("photo", photo);
    uploadData.append("description", photo.description);
    console.log(photo.description);
    uploadData.append("photoImage", selectedFile);
    console.log(selectedFile);
    uploadData.append("privacy", photo.privacy);
    console.log(photo.privacy);
    return this.apiService.post("/photos/" + albumId, uploadData);
  }

  //method to get all the photos of an album
  getPhotos(albumId): Observable<any> {
    return this.apiService.get("/photos/" + albumId);
  }

  //method to get a photo by id
  getPhoto(photoId): Observable<any> {
    return this.apiService.get("/photos/photo/" + photoId);
  }

  //method to edit a photo
  editPhoto(photo, selectedFile, id): Observable<any> {
    const uploadData = new FormData();
    uploadData.append("description", photo.description);
    console.log(photo.description);
    uploadData.append("photoImage", selectedFile);
    console.log(selectedFile);
    uploadData.append("privacy", photo.privacy);
    console.log(photo.privacy);
    console.log("ids", id);
    return this.apiService.put("/photos/" + id, uploadData);
  }
  //method to delete a photo by id
  deletePhoto(albumId, photoId): Observable<any> {
    return this.apiService.delete("/photos/" + albumId + "/" + photoId);
  }

  //method to like a photo
  likePhoto(id) {
    return this.apiService.post("/photos/like/" + id, "");
  }
}
