import jwtDecode from "jwt-decode";
import { makeAutoObservable } from "mobx";

class Role {

  isAdmin = false

  constructor(){
    makeAutoObservable(this)
  }
  getRole(){
    this.isAdmin = jwtDecode(localStorage.getItem('token')).role === "admin"?true:false
  }

}
export default new Role()