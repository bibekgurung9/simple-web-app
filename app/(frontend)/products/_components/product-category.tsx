import React from 'react'

interface ProductCategoryProps{
  //id: string;
  label: string;
}

const ProductCategory = ({
  //id,
  label,
}: ProductCategoryProps) => {
  return (
    <button 
      className='h-14 w-full m-2 bg-black text-white p-1 rounded-lg hover:bg-black/70'
      >
      {label}
    </button>
  )
}

export default ProductCategory