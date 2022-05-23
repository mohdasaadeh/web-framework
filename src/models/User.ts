import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { ApiAsync } from "./ApiAsync";
import { Attributes } from "./Attributes";

interface UserData {
  id?: number;
  username?: string;
  age?: number;
}

export class User extends Model<UserData> {
  static buildUser(userData: UserData) {
    return new User(new Attributes(userData), new Eventing(), new ApiAsync());
  }
}
