import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import catalogStore from "./store/store";
import "./assets/styles/fonts.css";
import "./assets/styles/main.css";
import "./assets/styles/reset.css";
import Header from "./components/layout/header";
import CatalogView from "./views/catalogView";
import CartView from "./views/cartView";

const useCatalogStore = new catalogStore();

export const Context = createContext({ useCatalogStore });

function App() {
  return (
    <>
      <Context.Provider value={{ useCatalogStore }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CatalogView/>}/>
            <Route path="/cart" element={<CartView/>}/>
          </Routes>
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
