import React from 'react';
import './ProductForm.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../card/Card';

const ProductForm = ({
  products,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleImageChange,
  addProductDataChange,
  saveProductSubmit,
}) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProductSubmit}>
          <Card cardClass={'group'}>
            <label>Product Image</label>
            <code className='--color-dark'>
              Supported Formats:jpg,jpeg,png,webp
            </code>
            <input
              type='file'
              name='image'
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview != null ? (
              <div className='image-preview'>
                <img
                  src={imagePreview}
                  alt='Product'
                  style={{
                    width: '100%',
                    height: '42vh',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type='text'
            placeholder='Product Name'
            name='name'
            value={products?.name}
            onChange={addProductDataChange}
          />
          <label>Product Category:</label>
          <input
            type='text'
            placeholder='Product Category'
            name='category'
            value={products?.category}
            onChange={addProductDataChange}
          />
          <label>Product Price:</label>
          <input
            type='number'
            placeholder='Product Price'
            name='price'
            value={products?.price}
            onChange={addProductDataChange}
          />
          <label>Product Quantity:</label>
          <input
            type='number'
            placeholder='Product Quantity'
            name='quantity'
            value={products?.quantity}
            onChange={addProductDataChange}
          />
          <label>Product Description:</label>
          <ReactQuill
            theme='snow'
            name='description'
            value={description}
            onChange={(e) => setDescription(e)}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className='--my'>
            <button type='submit' className='--btn --btn-primary'>
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

ProductForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default ProductForm;
