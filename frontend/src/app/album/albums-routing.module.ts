import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailsComponent } from "./album-details/album-details.component";
import { CreateAlbumComponent } from "./create-album/create-album.component";
import { EditAlbumComponent } from "./edit-album/edit-album.component";
import { AuthGuard } from "../service/auth-guard.service";

const albumsRoutes: Routes = [
  { path: "albums", component: AlbumsComponent },
  { path: "edit/album/:id", component: EditAlbumComponent },
  { path: "show/:id", component: AlbumDetailsComponent },
  {
    path: "new/album",
    component: CreateAlbumComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(albumsRoutes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
