import { Collection } from "./Collection";

export abstract class ViewCollection<T, K> {
  abstract renderItem(itemRoot: Element, item: T): void;

  constructor(public root: Element, public collection: Collection<T, K>) {}

  async render(): Promise<void> {
    await this.collection.fetch();

    this.collection.models.forEach((item, index) => {
      const div = document.createElement("div");

      div.classList.add(`item-${index}`);

      this.root.append(div);

      this.renderItem(div, item);
    });
  }
}
