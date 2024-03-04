import './index.css';

import { App } from './App';
import { FavoriteProvider } from './context/ContexProvider';
import React from "react";
import ReactDOM from "react-dom/client";

// import { Router } from "./router"
// import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </React.StrictMode>
);
{/* <RouterProvider router={Router} /> */ }







