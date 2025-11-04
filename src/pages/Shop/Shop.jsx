import React from 'react'
import './Shop.css'
import { PRODUCTS } from '../../Products'
import { Product } from './Product'

export const Shop = () => {
  return (
    <div className='shop'>
        <div className='shop-title'>
            <h2>Witaj w świecie muzyki</h2>
        </div>
        <div className="products">
            {PRODUCTS.map((product) => (
            <Product data={product}/>
            ))}
        </div>
    </div>
  )
}
