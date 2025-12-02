import React, { useContext } from 'react';
import './Shop.css';
import { Product } from './Product';
import { ShopContext } from '../../Context/ShopContext';

export const Shop = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className='shop'>
      <div className='shop-title'>
        <h2>Witaj w świecie muzyki</h2>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
