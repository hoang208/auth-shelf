const { default: axios } = require("axios");
const { put } = require("redux-saga/effects");

function* addItem(action) {
    try {
      yield axios.post("/api/shelf", action.payload);
      yield put({ type: "GET_SHELF" });
    } catch (error) {
      console.log("error posting a movie", error);
    }
  }

  export default addItem