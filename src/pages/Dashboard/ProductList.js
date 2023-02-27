import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteProduct from "../../redux/thunk/products/deleteProduct";
import {FaRegEdit} from "react-icons/fa";
import Modal from 'react-modal';
import loadProductData from "../../redux/thunk/products/fetchProducts";
import { useForm } from "react-hook-form";
import updateItem from "../../redux/thunk/products/updateProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  });

  const customStyles = {
    content: {
      top: '52%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const submit = data => { 
        const itemId = data._id;
        console.log(itemId, data)
      dispatch(updateItem(itemId, data))
    }
  

  return (
    <div class='flex flex-col justify-center items-center h-full w-full '>
      <div class='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
        <header class='px-5 py-4 border-b border-gray-100'>
          <div class='font-semibold text-gray-800'>Products</div>
        </header>

        <div class='overflow-x-auto p-3'>
          <table class='table-auto w-full'>
            <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
              <tr>
                <th></th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Product Name</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Brand</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>In Stock</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Price</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-center'>Edit</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-center'>Delete</div>
                </th>
              </tr>
            </thead>

            <tbody class='text-sm divide-y divide-gray-100'>
              {products.map(({ model, brand, price, status, _id }) => (
                <tr>
                  <td class='p-2'>
                    <input type='checkbox' class='w-5 h-5' value='id-1' />
                  </td>
                  <td class='p-2'>
                    <div class='font-medium text-gray-800'>{model}</div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left capitalize'>{brand}</div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left'>
                      {status ? (
                        <p className='text-green-500 font-medium'>Available</p>
                      ) : (
                        <p className='text-red-500 font-medium'>Stock out</p>
                      )}
                    </div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left font-medium text-indigo-500'>
                      {price}
                    </div>
                  </td>


                  <td class='p-2'>
                    <div class='flex justify-center'>
                      <button
                      onClick={openModal}
                      >
                        <FaRegEdit/>
                      </button>
                    </div>
                  </td>
                  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>X</button>
        <div className='flex justify-center items-center h-full '>

        <form
        className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
        onSubmit={handleSubmit(submit)}
      >
        <div className='flex flex-col w-full hidden max-w-xs'>
          <label className='mb-2' htmlFor='model'>
            Id
          </label>
          <input type='text' id='id' 
          defaultValue={_id}
          {...register("_id")}
           />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='model'>
            Model
          </label>
          <input type='text' id='model' 
          defaultValue={model}
          {...register("model")}
           />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='image'>
            Image
          </label>
          <input type='text' name='image' id='image' 
          // {...register("image")}
           />
        </div>

        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-3' htmlFor='brand'>
            Brand
          </label>
          <select name='brand' id='brand'
          {...register("brand")}
          defaultValue={brand}
          >
            <option value='amd'>AMD</option>
            <option value='intel'>Intel</option>
          </select>
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='price'>
            Image
          </label>
          <input type='text' name='price' id='price' 
          // {...register("price")} 
          />
        </div>

        <div className='flex flex-col w-full max-w-xs'>
          <h1 className='mb-3'>Availability</h1>
          <div className='flex gap-3'>
            <div>
              <input
                type='radio'
                id='available'
                value={true}
                // {...register("status")}
              />
              <label className='ml-2 text-lg' htmlFor='available'>
                Available
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='stockOut'
                name='status'
                value={false}
                // {...register("status")}
              />
              <label className='ml-2 text-lg' htmlFor='stockOut'>
                Stock out
              </label>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center w-full'>
          <button
            className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
            type='submit'
          >
            update
          </button>
        </div>
      </form>
      </div>
      </Modal>
                  <td class='p-2'>
                    <div class='flex justify-center'>
                      <button 
                      onClick={()=>dispatch(deleteProduct(_id))}
                      >
                        <svg
                          class='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      

    </div>
    // </section>
  );
};

export default ProductList;
