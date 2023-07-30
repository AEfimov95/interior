import React, { useContext, useMemo } from "react";
import { Context } from "../App";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ChevronCartIcon } from "../icons";
import "../assets/styles/cart.scss";
function CartView() {
  const { useCatalogStore } = useContext(Context);
  const navigate = useNavigate();
  const totalCost = useMemo(() => {
    return useCatalogStore.totalCost;
  }, [useCatalogStore.totalCost]);
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function incItem(id) {
    useCatalogStore.addToCart(id);
  }
  function decrItem(id) {
    useCatalogStore.reduceCartItem(id);
  }
  return (
    <section className="cart-wrapper">
      <div className="position-wrapper">
        {totalCost > 0 && (
          <div className="position-header">
            <p>Товар</p>
            <p>К-во</p>
          </div>
        )}
        <div>
          {useCatalogStore.catalog.map((item) => (
            <div key={item.id}>
              {item.count > 0 && (
                <div className="position">
                  <img src={item.img} alt={item.name} />
                  <div className="position__info">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <h3>{formatNumber(item.price)} руб.</h3>
                    <div className="position__info-buttons">
                      <button>Избранные</button>
                      <button
                        onClick={() => useCatalogStore.removeFromCart(item.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <div className="position__counter">
                    <p>{item.count}</p>
                    <div>
                      <div
                        className="position__counter-chevron"
                        style={{ rotate: "180deg" }}
                        onClick={() => incItem(item.id)}
                      >
                        <ChevronCartIcon />
                      </div>
                      <div
                        className="position__counter-chevron"
                        onClick={() => decrItem(item.id)}
                      >
                        <ChevronCartIcon />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {totalCost > 0 && (
          <div className="position__activeBtn">
            <button
              onClick={() => useCatalogStore.removeAllFromCart()}
              className="position__activeBtn-remove"
            >
              Очистить корзину
            </button>
            <button
              onClick={() => navigate("/")}
              className="position__activeBtn-continue"
            >
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
      <div className="order">
        <h2>Оформление заказа</h2>
        <form className="order__form">
          <input placeholder="Имя Фамилия" />
          <input placeholder="+ 7 904 000 80 80" />
          <input placeholder="Адрес доставки" />
          <h3>
            Итого: <span>{formatNumber(totalCost)} руб.</span>
          </h3>
          <button>Оформить заказ</button>
        </form>
      </div>
    </section>
  );
}

export default observer(CartView);
