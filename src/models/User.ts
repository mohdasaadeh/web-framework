import axios, { AxiosResponse } from "axios";

interface UserData {
  id?: number;
  username?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private userData: UserData) {}

  get(dataKey: string): string | number {
    return this.userData[dataKey];
  }

  set(updatedData: UserData): void {
    Object.assign(this.userData, updatedData);
  }

  on(type: string, callback: Callback): void {
    const typeCallbacks: Callback[] = this.events[type] || [];

    typeCallbacks.push(callback);

    this.events[type] = typeCallbacks;
  }

  trigger(type: string): void {
    const typeCallbacks: Callback[] = this.events[type];

    if (!typeCallbacks || typeCallbacks.length === 0) return;

    typeCallbacks.forEach((callback) => callback());
  }

  store(): void {
    if (JSON.stringify(this.userData) === JSON.stringify({}))
      throw new Error("The user isn't entered!");

    const id = this.userData.id;

    if (!id) {
      axios.post("http://localhost:3000/users", this.userData);
    } else {
      axios.put(`http://localhost:3000/users/${id}`, this.userData);
    }
  }

  async fetch(id: number): Promise<void> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );

    this.userData = response.data;
  }
}
