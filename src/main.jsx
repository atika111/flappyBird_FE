import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MyAuthProvider from "./Context/MyAuthProvider.jsx";
import MyScoreProvider from "./Context/MyScoreProvider.jsx";
import MyUserProvider from "./Context/MyUserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyAuthProvider>
    <MyScoreProvider>
      <MyUserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyUserProvider>
    </MyScoreProvider>
  </MyAuthProvider>
);
