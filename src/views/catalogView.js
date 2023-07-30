import React, { useContext } from "react";
import { Context } from "../App";
import "../assets/styles/catalog.scss";
import { BagIcon, FavoriteIcon, ChevronIcon } from "../icons";
import { observer } from "mobx-react-lite";

function CatalogView() {
  const { useCatalogStore } = useContext(Context);
  const handleChange = (event) => {
    useCatalogStore.changeSortByPrice(event.target.value);
  };
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <section>
      <div className="filter-wrapper">
        <select name="filter" className="filter" onChange={handleChange}>
          {!useCatalogStore.sortByPrice && <option value=""></option>}
          <option value="high">Порядок: сперва дороже</option>
          <option value="low">Порядок: сперва дешевле</option>
        </select>
        <div className="filter-chevron">
          <ChevronIcon />
        </div>
      </div>
      <div className="catalog">
        {useCatalogStore.catalog.map((item) => (
          <div className="catalog__item" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <h3>{formatNumber(item.price)} руб.</h3>
            <div className="catalog__item-active">
              <button onClick={() => useCatalogStore.addToCart(item.id)}>
                {<BagIcon />}
              </button>
              <button>{<FavoriteIcon />}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default observer(CatalogView);
