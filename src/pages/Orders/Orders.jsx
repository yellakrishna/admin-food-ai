import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets, url } from "../../assets/assets";
import logo from "/logo-design.jpg"



const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="page-content">
    <div className="order-page">
      <h3 className="page-title">📦 Orders</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            {/* Order Header */}
            <div className="order-header">
              <img src={logo} alt="Order" className="order-icon" />
              <div className="order-basic">
                <p className="order-food">
                  {order.items
                    .map(
                      (item, i) =>
                        `${item.name} x ${item.quantity}${
                          i !== order.items.length - 1 ? ", " : ""
                        }`
                    )
                    .join("")}
                </p>
                <p className="order-customer">
                  {order.address.firstName} {order.address.lastName}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="order-address">
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country} - {order.address.zipcode}
              </p>
              <p>📞 {order.address.phone}</p>
            </div>

            {/* Payment Info */}
            <div className="order-payment">
              <p>
                <strong>Payment Mode:</strong>{" "}
                {order.paymentMode === "cod" ? "Cash on Delivery" : "Online"}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {order.payment ? "✅ Paid" : "❌ Pending"}
              </p>
            </div>

            {/* Order Footer */}
            <div className="order-footer">
              <p>
                <strong>Items:</strong> {order.items.length}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.amount}
              </p>
              <select
                className="status-select"
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Order;
