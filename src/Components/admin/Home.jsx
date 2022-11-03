import React, { useEffect } from "react";
import InfoBox from "../infoBox/InfoBox";
import "./Home.css";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../Redux/slice/productSlice";
import { CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from "../../Redux/slice/orderSlice";
import useFetchCollection from "../../CustomHooks/useFetchCollection";
import Chart from "../infoBox/Chart";


//icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
function Home() {
  const dispatch = useDispatch()
  const fbProducts = useFetchCollection('products')
  const {data} = useFetchCollection('orders')
  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)
  useEffect(() => {
    dispatch(STORE_PRODUCTS({products:fbProducts.data}))
    dispatch(STORE_ORDERS(data))
    dispatch(CALC_TOTAL_ORDER_AMOUNT())
  },[dispatch,data,fbProducts])
  return (
    <div className="home">
      <h2>Admin Home</h2>
      <div className="info-box">
        <InfoBox
          cardclass="card card1"
          title="Earnings"
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardclass="card card2"
          title="Products"
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardclass="card3"
          title="Orders"
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}

export default Home;
