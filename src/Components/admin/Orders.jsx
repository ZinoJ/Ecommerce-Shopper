import React, { useEffect } from 'react'
import './Orders.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../CustomHooks/useFetchCollection';
import { selectOrderHistory, STORE_ORDERS } from '../../Redux/slice/orderSlice';
import { selectUserID } from '../../Redux/slice/authSlice';
import Loader from '../Loader';

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);
  const { data, isLoading } = useFetchCollection("orders");

  const handleClick = (id) => {
    navigate(`/admin/order_details/${id}`);
  };

  // const filteredOrders = orders.filter((order) => order.userID === userID);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  return (
    <div className="table">
      <h2>All Orders</h2>
      <p>Open an order to <b>change order Status</b></p>
      <br />
      <>
        {isLoading && <Loader />}
        <div className="tables">
          {orders.length === 0 ? (
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
                {orders.map((order, index) => {
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
        </div>
      </>
    </div>
  );
}

export default Orders