import { Collection } from "./models/Collection";
import { User, UserData } from "./models/User";
import { UserList } from "./models/UserList";

const root = document.querySelector("#root");

const userCollection = new Collection<User, UserData>(
  "http://localhost:3000/users",
  (element) => User.buildUser(element)
);

const userList = new UserList(root, userCollection);

userList.render();
