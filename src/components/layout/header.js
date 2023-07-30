import React from "react";
import "../../assets/styles/layout.scss";
import { useNavigate } from "react-router-dom";
import { CartIcon, CatalogIcon } from "../../icons";

function Header() {
  const navigate = useNavigate();
  const goCatalog = () => {
    navigate("/interior");
  };
  const goCart = () => {
    navigate("/interior/cart");
  };
  return (
    <>
      <header className="header">
        <h1>Интерьер.</h1>
        <div className="header__buttons">
          <button onClick={goCatalog}>
            <span>Каталог</span>
            <div className="header__buttons-mobile">
              <CatalogIcon />
            </div>
          </button>
          <button onClick={goCart}>
            <span>Корзина</span>
            <div className="header__buttons-mobile">
              <CartIcon />
            </div>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
