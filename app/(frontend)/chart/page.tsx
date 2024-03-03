"use client"
import { PieChart, Pie, Tooltip } from 'recharts'; 
import React, { useEffect, useState } from 'react'

const PiechartPage = () => {
  const [products, setProduct] = useState([]);
  const uniqueCategorires:any = [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/`);
        const data = await response.json();
        setProduct(data.products);
      } catch (error) {
        console.error('[ERROR_FETCHING_DATA]', error);
      }
    };
    fetchProducts();
  }, []);


  //for listing unique category names for pie chart
  products.forEach((product) => {
    if(!uniqueCategorires.includes(product.category)){
      uniqueCategorires.push(product.category)
    }
  })

  const data = uniqueCategorires.map((categoryChart) => ({
    name: categoryChart, 
    value: products.filter((product) => product.category === categoryChart).length,   
  }))

  return (
    <div>
      <h1 className='flex flex-col justify-center items-center text-xl font-bold text-center mt-6'>Current Product Distribution Of Products By Category:</h1>
      <p className='text-slate-500/90n text-center'>Hover Over To View Thier Category's Name</p>
      
      <div className='flex justify-center items-center'>
      <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>

    </div>
  )
}

export default PiechartPage