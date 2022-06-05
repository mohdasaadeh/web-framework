import { User } from "../models/User";
import { WebView } from "./WebView";

export class UserShow extends WebView<User> {
  template(): string {
    return `
            <div>
                <h1>User Details</h1>
            </div>
            <div>
                <p>Name: ${this.model.get("username")}</p>
                <p>Age: ${this.model.get("age")}</p>
            </div>
        `;
  }
}
