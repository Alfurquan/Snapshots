import { NgModule } from "@angular/core";
import { CreatePhotoComponent } from "./create-photo/create-photo.component";
import { PhotoDetailsComponent } from "./photo-details/photo-details.component";
import { EditPhotoComponent } from "./edit-photo/edit-photo.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PhotoRoutingModule } from "./photo-routing.module";

@NgModule({
  declarations: [
    CreatePhotoComponent,
    PhotoDetailsComponent,
    EditPhotoComponent
  ],
  imports: [FormsModule, CommonModule, PhotoRoutingModule]
})
export class PhotoModule {}
