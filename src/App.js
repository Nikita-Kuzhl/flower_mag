import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Products from "./pages/Products";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import user from "./store/user";
import { observer } from "mobx-react-lite";
import Cabinet from "./pages/Cabinet";
import { useEffect } from "react";
import role from "./store/role";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      role.getRole();
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:id" element={<Products />} />
        {user.auth ? <Route path="/cart" element={<Cart />} /> : <></>}
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default observer(App);
