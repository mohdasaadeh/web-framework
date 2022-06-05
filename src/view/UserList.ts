import { User } from "../models/User";
import { UserData } from "../models/User";
import { UserEdit } from "./UserEdit";
import { ViewCollection } from "./ViewCollection";

export class UserList extends ViewCollection<User, UserData> {
  renderItem(itemRoot: Element, item: User): void {
    new UserEdit(itemRoot, item).render();
  }
}
