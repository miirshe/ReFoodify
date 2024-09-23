import React, { useState } from "react";
import useCartStore from "@/hooks/useCartStore";
import OrderDetails from "./OrderDetails";
import "./purchaseHistory.style.css";

const PurchaseHistory = () => {
  const { orderHistory } = useCartStore();
  console.log("orderHistory:", orderHistory);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCheckOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToHistory = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return <OrderDetails order={selectedOrder} onBack={handleBackToHistory} />;
  }

  return (
    <div className="purchase-history-container">
      <div className="p-4 md:p-10">
        <h1 className="purchase-history-title">
          Purchase <span className="title-primary">History</span>
        </h1>

        <div className="flex flex-col gap-y-2 mt-10 w-full">
          {orderHistory?.order?.map((order) => (
            <div
              key={order?.id}
              className="purchase-card purchase-card-horizontal"
            >
              <img
                src={order?.image}
                alt=""
                className="purchase-image purchase-image-large"
              />
              <div className="purchase-details purchase-details-left">
                <div className="text-center md:text-left">
                  <p>{order?.date}</p>
                </div>
                <div className="purchase-buttons purchase-buttons-between">
                  <p className="purchase-price">{order.salePrice}</p>
                  <button
                    className="button-check-order"
                    onClick={() => handleCheckOrder(order)}
                  >
                    Check order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
