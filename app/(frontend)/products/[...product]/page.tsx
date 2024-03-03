"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {  useEffect, useState } from 'react'

const ProductPage = () => {
  const pathname = usePathname();
  const productId = pathname.split('/products/')[1];
  const [item, setItem] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  useEffect(() => {
    const productDetail =  async () => {
      try{
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setItem(data);
        console.log(data)
      } catch(error){
        console.error('[ERROR_FETCHING_DATA]', error);
      }
    }
    productDetail();
  }, [])

  return (
    <div className='p-16'>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
      <div className='h-full'>
        <img 
          src={item.thumbnail} 
          className='border border-black shadow-xl m-auto'
          alt={item.title}
          loading='lazy'
          />
      </div>
      <div className='flex flex-col px-12 justify-center items-left gap-y-2'>
        <h1 className='font-bold text-3xl'>{item.title}</h1>
        <p className='font-medium text-gray-600'>{item.description}</p>
          <strong>Price: ${item.price}</strong> 
          <strong>Discount: <span className='text-emerald-600'>{item.discountPercentage}%</span></strong> 
          <strong>Rating:⭐{item.rating}</strong> 
          <strong>Stock: {item.stock}</strong> 
          <strong>Brand: {item.brand}</strong> 
          <strong>Category:  
            <Link 
              href={'/product'}
              className='h-4 m-2 p-1.5 rounded-md bg-black text-white'
              >
            {item.category}
            </Link> 
          </strong> 
      </div>
    </div>
  </div>
  )
}

export default ProductPage;