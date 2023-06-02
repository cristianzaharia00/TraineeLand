import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import NavBar from "./components/Shared/navbar.jsx";
import Cart from "./components/pages/Cart/cart.jsx";
import Home from "./components/pages/Home/home";
import Store from "./components/pages/Shop/shop";
import Contact from "./components/pages/Contact/contact";
import Gallery from "./components/pages/Gallery/gallery";
import About from "./components/pages/About/about";
import LoginRegister from "./components/auth/login-register";
import UserContext from "./components/context/usercontext";
import ShopContext from "./components/context/shopcontext";
import CartContext from "./components/context/cartcontext";
import FiltersContext from "./components/context/filterscontext";
import Customize from "./components/pages/Customize/customize.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [shop, setShop] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    season: [
      { value: "Vara", label: "Vara" },
      { value: "Iarna", label: "Iarna" },
      { value: "Primavara", label: "Primavara" },
      { value: "Toamna", label: "Toamna" },
    ],
    type: [
      { value: "Sandalute", label: "Sandalute" },
      { value: "Pantofiori", label: "Pantofiori" },
      { value: "Ghetute", label: "Ghetute" },
      { value: "Cizmulite", label: "Cizmulite" },
      { value: "Botosei", label: "Botosei" },
    ],
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
        setCart(userRes.data.cart);
      } else {
        if (!localStorage.getItem("cart"))
          localStorage.setItem("cart", JSON.stringify([]));
        cart && setCart(JSON.parse(localStorage.getItem("cart")));
      }
    };

    const getShopItems = async () => {
      const shopItems = await Axios.get("/items/");
      setShop(shopItems.data);
    };

    checkLoggedIn();
    getShopItems();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <ShopContext.Provider value={{ shop, setShop }}>
            <CartContext.Provider value={{ cart, setCart }}>
              <FiltersContext.Provider value={{ filters, setFilters }}>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <NavBar number={2} />

                <Switch>
                  <Route path="/about">
                    <About />
                  </Route>

                  <Route path="/shop">
                    <Store
                      shop={[
                        { id: 1, value: 4 },
                        { id: 2, value: 0 },
                        { id: 3, value: 0 },
                        { id: 4, value: 0 },
                      ]}
                    />
                  </Route>
                  <Route path="/cart">
                    <Cart
                      cart={[
                        {
                          id: 1,
                          photo: 1,
                          text: "Ghetute Negre",
                          price: 100,
                          quantity: 4,
                        },
                        {
                          id: 2,
                          photo: 1,
                          text: "Ghetute Negre",
                          price: 300,
                          quantity: 2,
                        },
                      ]}
                    />
                  </Route>

                  <Route path="/gallery">
                    <Gallery />
                  </Route>
                  <Route path="/contact">
                    <Contact />
                  </Route>

                  <Route path="/login-register">
                    <LoginRegister />
                  </Route>
                  <Route path="/customize">
                    <Customize />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </FiltersContext.Provider>
            </CartContext.Provider>
          </ShopContext.Provider>
        </UserContext.Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
