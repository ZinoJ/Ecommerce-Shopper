import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import useFetchCollection from "../../CustomHooks/useFetchCollection";
import { selectUserID } from "../../Redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../Redux/slice/orderSlice";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);
  const { data, isLoading } = useFetchCollection("orders");

  const handleClick = (id) => {
    navigate(`/order_details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  return (
    <div className="container">
      <div className="checkout__details table">
      <h2>Your Order History</h2>
      <p>Open an order to leave a Product review</p>
      <br />
      <>
        {isLoading && <Loader />}
          {filteredOrders.length === 0 ? (
            <p>No Order Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={id} onClick={() => handleClick(id)} style={{cursor: 'pointer'}}>
                      <td>{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>${orderAmount}</td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? "pending"
                              : "delivered"
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
      </>
    </div>
    </div>
  );
}

export default Orders;
