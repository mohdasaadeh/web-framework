import { User } from "../models/User";
import { WebView } from "./WebView";

export class UserForm extends WebView<User> {
  template(): string {
    return `
            <div>
                <input/>
                <button id="update-name">Update Name</button>
            </div>
            <div>
                <button id="random-age">Random Age</button>
            </div>
            <div>
                <button id="save">Save</button>
            </div>
        `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#update-name": this.setName,
      "click:#random-age": this.setRandomAge,
      "click:#save": this.save,
    };
  }

  setName = (): void => {
    const input = this.root.querySelector("input").value;

    if (!input) return;

    this.model.set({ username: input });
  };

  setRandomAge = (): void => {
    const age = Math.floor(Math.random() * 100);

    this.model.set({ age });
  };

  save = (): void => {
    const data = {
      id: this.model.get("id"),
      username: this.model.get("username"),
      age: this.model.get("age"),
    };

    this.model.store(data, "http://localhost:3000/users");
  };
}
