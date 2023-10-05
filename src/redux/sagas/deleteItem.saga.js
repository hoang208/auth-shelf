const { default: axios } = require("axios");
const { put } = require("redux-saga/effects");

function* deleteItem(action) {
    try {
      const deleteItem = yield axios.delete(`/api/shelf/${action.payload.id}`);
      console.log(deleteItem)
      yield put({ type: 'GET_SHELF'});
    } catch (error) {
      console.log("error DELETING item", error);
    }
  }

  export default deleteItem