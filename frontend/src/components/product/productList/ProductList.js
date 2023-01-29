import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilter } from '../../../redux/actions/searchAction';
import { shortenText } from '../../../utils/shortenText';
import { SpinnerImg } from '../../loader/Loader';
import Search from '../../search/Search';
import './ProductList.scss';
import ReactPaginate from 'react-paginate';
import {
  clearErrors,
  deleteProduct,
  getAllProduct,
} from '../../../redux/actions/productAction';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../../redux/constants/productConstant';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState('');

  const { filteredProducts } = useSelector((state) => state.filter);
  const { isDeleted, error } = useSelector((state) => state.productActions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteHandler(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate('/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAllProduct());
    }

    dispatch(searchFilter(products, search));
  }, [dispatch, products, search, isDeleted, navigate, error]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dire-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className='table'>
          {!isLoading && filteredProducts.length === 0 ? (
            <p>-- No product found, please add a product..</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems &&
                  currentItems.map((product, index) => {
                    const { _id, name, category, price, quantity } = product;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td title={name}>{shortenText(name, 12)}</td>
                        <td>{category}</td>
                        <td>₹{price}</td>
                        <td>{quantity}</td>
                        <td>₹{quantity * price.toFixed(2)}</td>
                        <td className='icons'>
                          <span>
                            <Link to={`/product-detail/${_id}`}>
                              <AiOutlineEye size={25} color={'purple'} />
                            </Link>
                          </span>
                          <span>
                            <Link to={`/edit-product/${_id}`}>
                              <FaEdit size={20} color={'green'} />
                            </Link>
                          </span>
                          <span>
                            <FaTrashAlt
                              size={20}
                              color={'red'}
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        {products.length > itemsPerPage && (
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel='Prev'
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageClassName='page-list'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='activePage'
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
