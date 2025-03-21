import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "./Components/Nav/Nav.js";
import Section from "./Components/Section/section.js";
import AboutUs from "./Components/NavComponents/About/AboutUs.js";
import Help from "./Components/NavComponents/Help/Help.js";
import Cart from "./Components/NavComponents/Cart/Cart.js";
import Error from "./Components/Error/Error.js";
import RestaurantMenu from "./Components/RestaurantMenu/RestaurantMenu.js";
import "./index.css";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore.js";
import UserContext from "./utils/UserContext.js";
import LoginForm from "./Components/LogIn/LoginForm.jsx";

// ✅ Lazy Load Grocery Component
const Grocery = lazy(() => import("./Components/NavComponents/Grocery/Grocery.js"));

// ✅ Layout Component
const Layout = () => {
  const [Username, setUserName] = useState("");
  const [email,setUserEmail] = useState("");
  const[password,setPassword] =useState("");

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUserName(storedUser.name || "");
      setUserEmail(storedUser.email || "");
      setPassword(storedUser.password || "");
    }
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser:{name: Username ,email:email,password:password},setUserName,setUserEmail,setPassword}}>
      <Provider store={AppStore}>
        <div>
          <Nav />
          <Outlet />
        </div>
      </Provider>
    </UserContext.Provider>
  );
};

// ✅ Configure Router
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap everything in Layout
    children: [
      { path: "/", element: <Section /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/cart", element: <Cart /> },
      { path: "/help", element: <Help /> },
      { path: "/restaurants/:resId", element: <RestaurantMenu /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading Grocery...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      

    ],
    errorElement: <Error />,
  },
]);

export default AppRouter;
