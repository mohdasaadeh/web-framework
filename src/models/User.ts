import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { ApiAsync } from "./ApiAsync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

export interface UserData {
  id?: number;
  username?: string;
  age?: number;
}

export class User extends Model<UserData> {
  static buildUser(userData: UserData): User {
    return new User(new Attributes(userData), new Eventing(), new ApiAsync());
  }

  static buildUserCollection(url: string): Collection<User, UserData> {
    return new Collection<User, UserData>(url, (user: UserData) =>
      User.buildUser(user)
    );
  }
}
