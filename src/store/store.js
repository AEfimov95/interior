import { makeAutoObservable, observable, runInAction } from "mobx";
import data from "../catalog/catalog.json";

export default class catalogStore {
  catalog = observable(data.catalog);
  sortByPrice = "";

  constructor() {
    makeAutoObservable(this);
  }
  changeSortByPrice(param) {
    this.sortByPrice = param;
    this.sortCatalogByPrice();
  }
  sortCatalogByPrice() {
    this.catalog.sort((a, b) => {
      if (this.sortByPrice === "low") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
  addToCart(id) {
    runInAction(() => {
      if (this.catalog.find((elem) => elem.id === id).count < 9) {
        this.catalog.find((elem) => elem.id === id).count++;
      }
    });
  }
  reduceCartItem(id) {
    runInAction(() => {
      if (this.catalog.find((elem) => elem.id === id).count > 1) {
        this.catalog.find((elem) => elem.id === id).count--;
      }
    });
  }
  removeFromCart(id) {
    runInAction(() => {
      this.catalog.find((elem) => elem.id === id).count = 0;
    });
  }
  removeAllFromCart() {
    runInAction(() => {
      this.catalog.forEach((item) => (item.count = 0));
    });
  }
  get totalCost() {
    let total = 0;
    for (const item of this.catalog) {
      total += item.price * item.count;
    }
    return total;
  }
}
