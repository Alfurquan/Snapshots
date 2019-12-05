import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [FormsModule, CommonModule, ProfileRoutingModule]
})
export class ProfileModule {}
