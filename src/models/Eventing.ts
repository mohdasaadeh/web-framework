export type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (type: string, callback: Callback): void => {
    const typeCallbacks: Callback[] = this.events[type] || [];

    typeCallbacks.push(callback);

    this.events[type] = typeCallbacks;
  };

  trigger = (type: string): void => {
    const typeCallbacks: Callback[] = this.events[type];

    if (!typeCallbacks || typeCallbacks.length === 0) return;

    typeCallbacks.forEach((callback) => callback());
  };
}
