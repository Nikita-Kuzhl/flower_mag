import { makeAutoObservable } from "mobx";


class User {
  auth = localStorage.getItem('token')?true:false
  constructor(){
    makeAutoObservable(this)
  }
  setAuth(item){
    localStorage.setItem('token',item)
    this.auth = true
  }
  delAuth(){
    localStorage.removeItem('token')
    this.auth = false
  }
}
export default new User();