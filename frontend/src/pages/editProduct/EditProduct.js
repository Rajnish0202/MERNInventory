import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import {
  productDetails,
  productUpdate,
  getAllProduct,
  clearErrors,
} from '../../redux/actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productConstant';

const EditProduct = () => {
  const {
    loading,
    error,
    product: productEdit,
  } = useSelector((state) => state.productDetails);

  const { isUpdated } = useSelector((state) => state.productActions);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(productEdit);

  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const addProductDataChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate('/dashboard');
      dispatch(getAllProduct());
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }

    dispatch(productDetails(id));
  }, [dispatch, id, error, isUpdated, navigate]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    );
  }, [productEdit]);

  const saveProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', product?.name);
    myForm.set('category', product?.category);
    myForm.set('sku', product?.category);
    myForm.set('quantity', product?.quantity);
    myForm.set('price', product?.price);
    myForm.set('description', description);
    if (productImage) {
      myForm.set('image', productImage);
    }

    dispatch(productUpdate(id, myForm));
  };

  return (
    <div>
      {loading && <Loader />}
      <h3 className='--my'>{`Edit Product : ${id}`}</h3>
      <ProductForm
        products={product}
        productImage={productImage}
        description={description}
        setDescription={setDescription}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        addProductDataChange={addProductDataChange}
        saveProductSubmit={saveProductSubmit}
      />
    </div>
  );
};

export default EditProduct;
