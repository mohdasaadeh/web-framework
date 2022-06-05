import { User } from "./User";
import { UserData } from "./User";
import { UserEdit } from "./UserEdit";
import { ViewCollection } from "./ViewCollection";

export class UserList extends ViewCollection<User, UserData> {
  renderItem(itemRoot: Element, item: User): void {
    new UserEdit(itemRoot, item).render();
  }
}
