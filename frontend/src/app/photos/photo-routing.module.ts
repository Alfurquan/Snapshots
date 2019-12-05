import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatePhotoComponent } from "./create-photo/create-photo.component";
import { PhotoDetailsComponent } from "./photo-details/photo-details.component";
import { EditPhotoComponent } from "./edit-photo/edit-photo.component";

const photoRoutes: Routes = [
  { path: "new/photo/:id", component: CreatePhotoComponent },
  { path: "album/photo/:id", component: PhotoDetailsComponent },
  { path: "edit/photo/:id", component: EditPhotoComponent }
];
@NgModule({
  imports: [RouterModule.forChild(photoRoutes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule {}
