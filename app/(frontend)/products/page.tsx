"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ProductCategory from './_components/product-category';
import ProductCard from './_components/product-card';

const ProductsPage = () => {
  const [products, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 6;

  const [ loadingProducts, setLoadingProducts] = useState(true);

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
    setLoadingProducts(false);
  }, []);

const handleCategoryClick = (category:any) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(
    (product) => !selectedCategory || product.category === selectedCategory
  );

  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentProduct = filteredProducts.slice(indexFirstItem, indexLastItem);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className='px-8 py-12 flex flex-col items-center justify-center'>
      <h1 className='my-6 font-bold text-3xl'>Available Product Categories:</h1>

      <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
        {products
          .filter((product, index, self) => {
            return index === self.findIndex((p) => p.category === product.category);
          })
          .map((product) => (
            <button 
              onClick={() => handleCategoryClick(product.category)}
              key={product.id}>
              <ProductCategory id={product.id} label={product.category.toUpperCase()} />
            </button>
          ))}
      </div>

      <h1 className='my-6 font-bold text-3xl'>
        Our Products: [{selectedCategory ? `${selectedCategory.toUpperCase()} Category` : 'All Categories'}]
      </h1>
    
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {currentProduct.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              stock={product.stock}
              brand={product.brand}
              category={product.category}
              thumbnail={product.thumbnail}
              images={product.images}
            />
          </Link>
        ))}
      </div>
      )}

      <div className='my-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 border ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    </div>
  );
};

export default ProductsPage;
