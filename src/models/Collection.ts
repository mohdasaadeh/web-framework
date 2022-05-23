import axios, { AxiosResponse } from "axios";

import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public url: string, public deserialize: (element: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch = async (): Promise<void> => {
    const response: AxiosResponse = await axios.get(this.url);

    response.data.forEach((element: K) => {
      this.models.push(this.deserialize(element));
    });

    this.trigger("change");
  };
}
