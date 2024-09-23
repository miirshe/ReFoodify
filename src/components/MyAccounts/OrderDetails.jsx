/* eslint-disable react/prop-types */
import React from "react";
import "./orderDetails.style.css";
import useCartStore, { parsePrice } from "@/hooks/useCartStore";

const OrderDetails = ({ order, onBack }) => {
    
  const { orderHistory } = useCartStore();
  const companyOrders = orderHistory?.order?.filter(
    (item) => item?.company === order?.company
  );

  const totalAmount = companyOrders.reduce(
    (sum, item) => sum + parsePrice(item.salePrice) * item.quantity,
    0
  );

  console.log("companyOrders:", companyOrders);

  return (
    <div className="order-details-container">
      <div className="order-details-header">
        <button className="order-details-back-button" onClick={onBack}>
          <span>&larr;</span> Go back
        </button>
        <h1 className="order-details-title">
          Purchase <span style={{ color: "green" }}>History</span>
        </h1>
      </div>
      <div className="order-details-content">
        <div className="order-details-header">
          <div className="space-y-1">
            <p className="order-details-company">{order?.company}</p>
            <p className="order-details-date">{order?.date}</p>
          </div>
          <p className="order-details-total">{totalAmount.toFixed(2)} €</p>
        </div>
        <div className="space-y-2">
          {companyOrders.map((item) => {
            const itemTotal = parsePrice(item.salePrice) * item.quantity;
            return (
              <div key={item?.id} className="order-item  rounded-sm shadow-sm">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="order-item-image"
                />
                <div className="order-item-details space-y-4">
                  <h3 className="order-item-name">{item?.name}</h3>
                  <p className="order-item-price">{item?.salePrice}</p>
                  <div className="flex items-center gap-10">
                    <p className="order-item-quantity">
                      Amount: {item?.quantity}
                    </p>
                    <p className="order-item-total">{itemTotal.toFixed(2)} €</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
