import React, { useState } from "react";
import PropTypes from "prop-types";
import Basket from "./Basket";

const Menu = ({ items }) => {
  const [basket, setBasket] = useState([]);

  const handleAddToBasket = (item) => {
    setBasket((prevBasket) => {
      const itemIndex = prevBasket.findIndex(
        (basketItem) => basketItem.id === item.id
      );
      if (itemIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[itemIndex].quantity += 1;
        return updatedBasket;
      }
      return [...prevBasket, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromBasket = (itemId) => {
    setBasket((prevBasket) => {
      const itemIndex = prevBasket.findIndex(
        (basketItem) => basketItem.id === itemId
      );
      if (itemIndex !== -1) {
        const updatedBasket = [...prevBasket];
        if (updatedBasket[itemIndex].quantity > 1) {
          updatedBasket[itemIndex].quantity -= 1;
        } else {
          updatedBasket.splice(itemIndex, 1);
        }
        return updatedBasket;
      }
      return prevBasket;
    });
  };

  const handleCheckout = () => {
    console.log("Order completed:", basket);
    setBasket([]); // Clear the basket after checkout
  };

  const handleCancelOrder = () => {
    setBasket([]); // Clear the basket when order is canceled
  };

  return (
    <div className="menu-container">
      <div className="menu">
        {items.map((menuItem) => {
          const { id, title, img, desc, price } = menuItem;
          return (
            <article key={id} className="menu-item">
              <img src={img} alt={title} className="photo" />
              <div className="item-info">
                <header>
                  <h4>{title}</h4>
                  <h4 className="price">${price}</h4>
                </header>
                <p className="item-text">{desc}</p>
                <button onClick={() => handleAddToBasket(menuItem)}>Buy</button>
              </div>
            </article>
          );
        })}
      </div>
      <Basket
        items={basket}
        onAdd={handleAddToBasket}
        onRemove={handleRemoveFromBasket}
        onCheckout={handleCheckout}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Menu;
