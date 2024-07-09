import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import { Display, Plots, Dashboard } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Display />} />
      <Route path='plots' element={<Plots />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <ToastContainer
      theme='dark'
      position='bottom-right'
      autoClose={5000}
      hideProgressBar={false}
      pauseOnHover
      pauseOnFocusLoss
      transition={Slide}
    />
  </React.StrictMode>
);
