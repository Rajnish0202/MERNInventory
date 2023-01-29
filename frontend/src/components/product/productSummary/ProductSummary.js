import React from 'react';
import './ProductSummary.scss';
import { HiCurrencyRupee } from 'react-icons/hi';
import { BsCart4, BsCartX } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import InfoBox from '../../infoBox/InfoBox';
import { formatNumbers } from '../../../utils/formatNumber';

const ProductSummary = ({ products, productsCount }) => {
  const totalValue = (items) => {
    const array = [];

    items.map((item) => {
      const { price, quantity } = item;
      const productValue = price * quantity;
      return array.push(productValue);
    });
    const sumValue = array.reduce((a, b) => a + b, 0);
    return sumValue;
  };

  const totalStock = products.filter((item) => item.quantity < 1);

  const totalCategory = [...new Set(products.map((item) => item.category))];

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox
          icon={<BsCart4 size={40} color='#fff' />}
          bgColor='card1'
          title={'Total Products'}
          count={productsCount ? productsCount : 0}
        />
        <InfoBox
          icon={<HiCurrencyRupee size={40} color='#fff' />}
          bgColor='card2'
          title={'Total Store Value'}
          count={`₹${formatNumbers(totalValue(products).toFixed(2))}`}
        />
        <InfoBox
          icon={<BsCartX size={40} color='#fff' />}
          bgColor='card3'
          title={'Out Of Stock'}
          count={totalStock.length}
        />
        <InfoBox
          icon={<BiCategory size={40} color='#fff' />}
          bgColor='card4'
          title={'All Category'}
          count={totalCategory.length}
        />
      </div>
    </div>
  );
};

export default ProductSummary;
