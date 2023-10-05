const { default: axios } = require("axios");
const { put } = require("redux-saga/effects");

function* getItems() {
  try {
    const items = yield axios.get(`/api/shelf`);
    console.log('items', items)
    yield put({ type: "SET_SHELF", payload: items.data});
  } catch (error) {
    console.log("error getting items", error);
  }
}

export default getItems;