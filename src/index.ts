import { User } from "./models/User";

const user = User.buildUser({ id: 1 });

user.on("change", () => console.log(user));

user.store(
  { id: 1, username: "Mohammad", age: 29 },
  "http://localhost:3000/users"
);
