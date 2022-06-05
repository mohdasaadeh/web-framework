import { Callback } from "../models/Eventing";

interface HasOn {
  on: (type: string, callback: Callback) => void;
}

export abstract class WebView<T extends HasOn> {
  abstract template(): string;

  constructor(public root: Element, public model: T) {
    this.model.on("change", (): void => {
      this.render();
    });
  }

  regions: { [key: string]: Element } = {};

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  eventsBinder(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let event in eventsMap) {
      const [type, selector] = event.split(":");

      fragment.querySelector(selector).addEventListener(type, eventsMap[event]);
    }
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let region in regionsMap) {
      this.regions[region] = fragment.querySelector(regionsMap[region]);
    }
  }

  regionsRender(): void {}

  render(): void {
    this.root.innerHTML = "";

    const template = document.createElement("template");

    template.innerHTML = this.template();

    const templateContent = template.content;

    this.eventsBinder(templateContent);

    this.mapRegions(templateContent);

    this.regionsRender();

    this.root.append(templateContent);
  }
}
