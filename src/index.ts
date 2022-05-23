import { User } from "./models/User";

const userCollection = User.buildUserCollection("http://localhost:3000/users");

userCollection.on("change", () => console.log(userCollection));

userCollection.fetch();
