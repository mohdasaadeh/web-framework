import { User } from "../models/User";
import { WebView } from "./WebView";
import { UserShow } from "./UserShow";
import { UserForm } from "./UserForm";

export class UserEdit extends WebView<User> {
  template(): string {
    return `
            <div>
                <div id="user-show"></div>
                <div id="user-form"></div>
            </div>
        `;
  }

  regionsMap(): { [key: string]: string } {
    return {
      userShow: "#user-show",
      userForm: "#user-form",
    };
  }

  regionsRender(): void {
    const userShow = new UserShow(this.regions.userShow, this.model);
    const userForm = new UserForm(this.regions.userForm, this.model);

    userShow.render();
    userForm.render();
  }
}
