import React from "react";
import PropTypes from "prop-types";

const Basket = ({ items, onAdd, onRemove, onCheckout, onCancelOrder }) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert(
      `Your order total is $${totalPrice.toFixed(2)} and has been completed.`
    );
    onCheckout();
  };

  return (
    <div className="basket">
      <h2>Basket</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id + index}>
            {item.title} - ${item.price}
            <button onClick={() => onAdd(item)}>+</button>
            <button onClick={() => onRemove(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handleCheckout}>Complete Order</button>
      <button onClick={onCancelOrder}>Cancel Order</button>
    </div>
  );
};

Basket.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
};

export default Basket;
