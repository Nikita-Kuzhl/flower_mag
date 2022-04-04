import { makeAutoObservable } from "mobx";

class Cart {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  length = this.cart.length;
  price = this.cart.reduce((a, b) => a + b.quantity * b.price, 0);

  constructor() {
    makeAutoObservable(this);
  }

  addProduct(item) {
    if (!this.cart.some((el) => el.id === item.id) || this.cart.length === 0) {
      item.quantity = 1;
      this.cart.push(item);
    } else {
      this.cart.forEach((i) => (i.id === item.id ? (i.quantity += 1) : null));
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.length = this.cart.length;
    this.price = this.cart.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  delProduct(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.length = this.cart.length;
    this.price = this.cart.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  addQuantity(id) {
    this.cart.forEach((item) => {
      if (item.id === id) {
        return (item.quantity += 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.price = this.cart.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  delQuantity(id) {
    this.cart.forEach((item) => {
      if (item.id === id) {
        if (item.quantity <= 1) {
          return null;
        }
        item.quantity -= 1;
      }
    });
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.price = this.cart.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  addOrder() {
    localStorage.removeItem('cart')
    this.cart = [];
    this.length = this.cart.length;
    this.price = 0;
  }
}

export default new Cart();
