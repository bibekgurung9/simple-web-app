"use client";
import React from 'react'

export interface ProductCardProps{
  id: string;
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
}

const ProductCard = ({ 
  id,
  title,
  price,
  discountPercentage,
  rating,
  stock,
  thumbnail,
}: ProductCardProps) => {
  return (
    <div className='w-[300px] h-[300px] flex flex-col items-center m-auto bg-black rounded-lg p-2 hover:shadow-2xl hover:scale-105 transition' key={id}>
      <div className='flex flex-col h-full p-2 text-white'>
        <img src={thumbnail} className='w-full h-48' />
        <h2 className='text-lg font-semibold my-2'>{title}</h2>
        <div className='flex justify-between items-center'>
          <span className='text-gray-200 text-sm'>Price: ${price}</span>
          <span className='text-green-500 text-sm'>{discountPercentage}% OFF</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-gray-200 text-sm'>Rating: {rating}</span>
          <span>Stock: {stock}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;