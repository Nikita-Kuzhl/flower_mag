import { makeAutoObservable } from "mobx";

class Order {
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Order();
