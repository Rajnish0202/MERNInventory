import React, { useEffect } from 'react';
import './ProductDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetails } from '../../../redux/actions/productAction';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const stockStatus = (qty) => {
    if (qty > 0) {
      return <span className='--color-success'>In Stock</span>;
    }
    return <span className='--color-danger'>Out Of Stock</span>;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(productDetails(id));
  }, [dispatch, id, error]);

  return (
    <div className='product-detail'>
      <h3 className='--mt'>{`Product Detail: ${id}`}</h3>
      <Card cardClass='card'>
        {loading && <SpinnerImg />}
        {product && (
          <div className='detail'>
            <Card cardClass='group'>
              {product?.image ? (
                <img
                  style={{
                    width: '100%',
                    height: '50vh',
                    objectFit: 'contain',
                  }}
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)} </h4>
            <hr />
            <h4>
              <span className='badge'>Name: </span> &nbsp;
              {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p style={{ textTransform: 'capitalize' }}>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> ₹{product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> ₹
              {product.price * product.quantity}
            </p>
            <hr />
            <p>
              <b>&rarr; Description : </b>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className='--color-dark'>
              Created on : {product.createdAt}
            </code>
            <br />
            <code className='--color-dark'>
              Last updated : {product.updatedAt}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails;
