import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((store) => store.shelf);
  console.log(shelf);
  useEffect(() => {
    dispatch({ type: "GET_SHELF" });
  }, []);

  //Data to send
  let [itemToAdd, setItemToAdd] = useState({
    description: "",
    image_url: "",
  });

  //Event listeners on inputs
  const handleDescriptionChange = (event) => {
    setItemToAdd({ ...itemToAdd, description: event.target.value });
  };
  const handleImageChange = (event) => {
    setItemToAdd({ ...itemToAdd, image_url: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_ITEM",
      payload: itemToAdd,
    });
  };


  return (
    <>
      <div className="container">
        <h2>Shelf</h2>
        {shelf.map((item) => (
          <div key={item.id}>
            <img src={item.image_url} alt={item.description}></img>
            <p>{item.description}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "DELETE_ITEM",
                  payload: {id: item.id}
                });
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          onChange={handleDescriptionChange}
          required
        ></input>
        <label htmlFor="imageLink">Image Link:</label>
        <input
          type="url"
          id="imageLink"
          name="imageLink"
          onChange={handleImageChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default ShelfPage;
