import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
const profileRoutes: Routes = [
  {
    path: "profile",
    component: ProfileComponent
  },

  { path: "edit/profile/:id", component: EditProfileComponent }
];
@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
