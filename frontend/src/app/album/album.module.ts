import { NgModule } from "@angular/core";
import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailsComponent } from "./album-details/album-details.component";
import { CreateAlbumComponent } from "./create-album/create-album.component";
import { EditAlbumComponent } from "./edit-album/edit-album.component";
import { AlbumsRoutingModule } from "./albums-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumDetailsComponent,
    CreateAlbumComponent,
    EditAlbumComponent
  ],
  imports: [AlbumsRoutingModule, CommonModule, FormsModule]
})
export class AlbumsModule {}
