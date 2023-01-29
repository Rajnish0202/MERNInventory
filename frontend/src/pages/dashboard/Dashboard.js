import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import { getAllProduct } from '../../redux/actions/productAction';
import { clearErrors } from '../../redux/actions/userAction';

const Dashboard = () => {
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isLoggedIn === true) {
      dispatch(getAllProduct());
    }
  }, [dispatch, error, isLoggedIn]);
  return (
    <>
      <ProductSummary productsCount={productsCount} products={products} />
      <ProductList products={products} isLoading={loading} />
    </>
  );
};

export default Dashboard;
