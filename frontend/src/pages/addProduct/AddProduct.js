import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import { createProduct } from '../../redux/actions/productAction';
import { CREATE_PRODUCT_RESET } from '../../redux/constants/productConstant';

const AddProduct = () => {
  const { loading, success } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
  });

  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const { name, category, price, quantity } = products;

  const addProductDataChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + '-' + number;
    return sku;
  };

  const saveProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('category', category);
    myForm.set('sku', generateSKU(category));
    myForm.set('quantity', quantity);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('image', productImage);

    dispatch(createProduct(myForm));
  };

  useEffect(() => {
    if (success) {
      navigate('/dashboard');
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [success, navigate, dispatch]);

  return (
    <div>
      {loading && <Loader />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
        products={products}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleImageChange={handleImageChange}
        addProductDataChange={addProductDataChange}
        saveProductSubmit={saveProductSubmit}
      />
    </div>
  );
};

export default AddProduct;
