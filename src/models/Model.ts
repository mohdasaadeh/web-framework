import { AxiosResponse, AxiosPromise } from "axios";

import { Callback } from "./Eventing";

interface Eventing {
  on(type: string, callback: Callback): void;
  trigger(type: string): void;
}

interface ApiAsync<T> {
  fetch(id: number, url: string): Promise<AxiosPromise>;
  store(data: T, url: string): Promise<AxiosPromise>;
}

interface Attributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(updatedData: T): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: Attributes<T>,
    private events: Eventing,
    private apiAsync: ApiAsync<T>
  ) {}

  get get() {
    return this.attributes.get;
  }

  set(updatedData: T): void {
    this.attributes.set(updatedData);

    this.events.trigger("change");
  }

  async fetch(id: number, url: string): Promise<void> {
    const response: AxiosResponse = await this.apiAsync.fetch(id, url);

    this.set(response.data);
  }

  async store(data: T, url: string): Promise<void> {
    const response: AxiosResponse = await this.apiAsync.store(data, url);

    this.set(response.data);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }
}
