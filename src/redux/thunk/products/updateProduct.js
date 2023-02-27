import { updateItemFailure, updateItemRequest, updateItemSuccess } from "../../actions/productAction";

const updateItem = (itemId, updatedData) => {
    return async (dispatch) => {
      dispatch(updateItemRequest());
      try {
        const response = await fetch(`http://localhost:5000/products/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          const updatedItem = await response.json();
          dispatch(updateItemSuccess(updatedItem));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        dispatch(updateItemFailure(error.message));
      }
    };
  };

export default updateItem;