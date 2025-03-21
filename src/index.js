import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./App"; // Import router
import "./index.css";
//import { AuthProvider} from 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    
    <RouterProvider router={AppRouter} />
    
  </React.StrictMode>
);
