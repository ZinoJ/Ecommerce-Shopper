import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Chart.css'
import { useSelector } from 'react-redux';
import { selectOrderHistory } from '../../Redux/slice/orderSlice';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Placed Orders', 'Processing' , 'Shipped' , 'Delivered'];



function Chart() {
   const orders = useSelector(selectOrderHistory)
   //Create a new array of the order status
   const array = []
   orders.map((order) => {
      const {orderStatus} = order
      array.push(orderStatus)
   })
   const getOrderStatusCount = (arr,value) => {
      return arr.filter((n) => n ===value).length
   }
   const [q1,q2,q3,q4] = [
      "Order Placed ...","Processing","Shipped", "Delivered"]
   const placed = getOrderStatusCount(array,q1)
   const processing = getOrderStatusCount(array,q2)
   const shipped = getOrderStatusCount(array,q3)
   const delivered = getOrderStatusCount(array,q4)
    const data = {
      labels,
      datasets: [
        {
          label: 'Order count',
          data: [placed, processing, shipped, delivered],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        
      ],
    };
   
  return (
    <div className='charts'>
      <div className="card">
         <h3>Order Status Chart</h3>
         <Bar options={options} data={data} />
      </div>
   </div>
  )
}

export default Chart