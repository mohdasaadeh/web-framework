import { User } from "./models/User";

const user = new User({ id: 1, username: "Yazan" });

user.store();

console.log(user.get("username"));

user.fetch(1);

setTimeout(() => console.log(user.get("username")), 5000);
